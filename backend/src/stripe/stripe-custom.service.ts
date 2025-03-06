import { Inject, Injectable, Logger, BadRequestException, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import Stripe from 'stripe';
import { Request } from 'express';
import { PurchasesService } from '../purchases/purchases.service';
import { ProductsService } from '../products/products.service';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../users/users.service';
import { Purchase } from '../purchases/entities/purchase.entity';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/mysql';
import { PurchaseStatus } from '../common/enums/purchase.enum';

@Injectable()
export class StripeCustomService {
    private stripe: Stripe;
    private readonly logger = new Logger(StripeCustomService.name);

    constructor(
        private readonly configService: ConfigService,
        private readonly productsService: ProductsService,
        private readonly purchasesService: PurchasesService,
        private readonly usersService: UsersService,
        @Inject('STRIPE_API_KEY') private readonly apiKey: string,
        @Inject('STRIPE_WEBHOOK_SECRET') private readonly webhookSecret: string,
        @InjectRepository(Purchase) private readonly purchaseRepository: EntityRepository<Purchase>,
    ) {
        if (!this.apiKey) throw new Error('Missing STRIPE_API_KEY');
        if (!this.webhookSecret) throw new Error('Missing STRIPE_WEBHOOK_SECRET');
    
        this.stripe = new Stripe(this.apiKey, { apiVersion: '2025-02-24.acacia' });
    }

    async createCheckoutSession(productId: string, userId: string): Promise<string> {
        try {
            const product = await this.productsService.findById(productId);
            if (!product) throw new NotFoundException('Product not found');
            const user = await this.usersService.findOne(userId);
            if (!user) throw new NotFoundException('User not found');

            // Validate user & product ownership
            if (await this.purchasesService.doesUserOwnCourse({ productId, userId })) {
                throw new BadRequestException('User already owns this product');
            }

            const pendingPurchase = await this.purchaseRepository.findOne({
                product: productId,
                user: userId,
                status: PurchaseStatus.PENDING
            })
            console.log("Pending Purchase: ", pendingPurchase)
            if(pendingPurchase) throw new BadRequestException("A pending payment already exists");

            

            const session = await this.stripe.checkout.sessions.create({
                payment_method_types: ['card'],
                mode: 'payment',
                customer_email: user.email,
                line_items: [
                    {
                        price_data: {
                            currency: 'usd',
                            product_data: {
                                name: product.name,
                                description: product.description,
                            },
                            unit_amount: product.priceInDollars * 100,
                        },
                        quantity: 1,
                    },
                ],
                metadata: {
                    productId,
                    userId,
                },
                success_url: `${this.configService.get<string>('FRONTEND_URL')}/success?session_id={CHECKOUT_SESSION_ID}`,
                cancel_url: `${this.configService.get<string>('FRONTEND_URL')}/cancel`,
            });

            
            await this.purchasesService.create({userId, productId, stripeSessionId: session.id}) 

            return session.url;
        } catch (error) {
            console.log(error)
            this.logger.error('Error creating checkout session', error);
            throw new InternalServerErrorException('Could not create Stripe session');
        }
    }

    async handleWebhook(req: Request, signature: string): Promise<void> {
        let event: Stripe.Event;

        try {
            event = this.stripe.webhooks.constructEvent(req.body, signature, this.webhookSecret);
        } catch (err) {
            this.logger.error('Webhook signature verification failed.', err);
            throw new BadRequestException('Invalid Stripe webhook');
        }

        const session = event.data.object as Stripe.Checkout.Session

        switch (event.type) {
            case 'checkout.session.completed':
                await this.confirmAndProcessPurchase(session.id, session.payment_intent as string);
                this.logger.warn(`Completed session: ${event.data.object.id}`);
                break;

            case 'checkout.session.expired':
                await this.handleSessionExpired(session.id);
                this.logger.warn(`Expired session: ${session.id}`);
                break;

            case 'payment_intent.succeeded':
                console.log('Payment Intent Succeeded:', event.data.object);
                break;
            
            case 'charge.refunded':
                const charge = event.data.object as Stripe.Charge;
                if (!charge.payment_intent) {
                    this.logger.error(`Refund event missing payment_intent: ${charge.id}`);
                    return;
                }
                this.handleRefund(charge.payment_intent as string);
                break;
            default:
                this.logger.log(`Unhandled event type: ${event.type}`);
        }
    }

    async handleRefund(paymentIntentId: string) {
        const purchase = await this.purchaseRepository.findOne({
            stripePaymentIntentId: paymentIntentId 
        });

        if (!purchase) {
            throw new NotFoundException('Purchase not found');
        }

        if (purchase.status === 'refunded') {
            throw new BadRequestException('Purchase has already been refunded');
        }

        if (purchase.status === 'pending') {
            throw new BadRequestException('Cannot refund a pending purchase');
        }

        if (purchase.status === 'paid') {
            await this.purchasesService.update(purchase.id, {status: PurchaseStatus.REFUNDED, refundedAt: new Date()});
        } else {
            throw new BadRequestException(`Invalid purchase status: ${purchase.status}`);
        }
    }

    async handleSessionExpired(stripeSessionId: string){
        const session = await this.stripe.checkout.sessions.retrieve(stripeSessionId);
        const { userId, productId } = session.metadata;

        if (!userId || !productId) {
            throw new BadRequestException('Missing metadata in session');
        }

        const purchase = await this.purchaseRepository.findOne({
            stripeSessionId: stripeSessionId
        });
        if (!purchase) {
            throw new NotFoundException('Purchase not found');
        }

        if (purchase.status === 'pending') {
            await this.purchasesService.delete(purchase.id);
            return;
        }

        if (purchase.status === 'paid') {
            throw new BadRequestException('Cannot expire a paid purchase');
        }

        if (purchase.status === 'refunded') {
            throw new BadRequestException('Cannot expire a refunded purchase');
        }
    }

    async confirmAndProcessPurchase(stripeSessionId: string, stripePaymentIntentId: string) {
        try {
          const session = await this.stripe.checkout.sessions.retrieve(stripeSessionId);

          // check if metadata exists
          const { userId, productId } = session.metadata;
            if (!userId || !productId) {
                this.logger.error('Missing metadata in session.');
                return;
            }

            // check if user already purchased the product
            const purchaseExists = await this.purchasesService.doesUserOwnCourse({ productId, userId });
            if (purchaseExists) {
                this.logger.warn(`Duplicate purchase attempt detected for user ${userId}`);
                return;
            }
    
          // Ensure payment was successful
          if (session.payment_status !== 'paid') {
            throw new Error('Payment not completed or still being processed.');
          }
    
          // Check amount
          const product = await this.productsService.findOne(productId);
          if (session.amount_total !== product.priceInDollars * 100) {
            throw new Error('Payment amount mismatch!');
          }
    
          // Check user
          if (session.metadata.userId !== userId) {
            throw new Error('Payment user mismatch!');
          }
          const purchase = await this.purchaseRepository.findOne({
            stripeSessionId
          })
          // update purchase status
          this.purchasesService.update(purchase.id, {
            status: PurchaseStatus.PAID,
            stripePaymentIntentId
          })

          return purchase
        } catch (error) {
          console.error('Payment verification failed:', error.message);
          throw new Error('Payment verification failed.');
        }
    }
}
