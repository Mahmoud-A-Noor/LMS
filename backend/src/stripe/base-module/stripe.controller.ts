import { Body, Controller, Get, Param, Post, Req, Headers } from '@nestjs/common';
import { StripeService } from './stripe.service';
import {Request} from "express"

@Controller('stripe')
export class StripeController {
    constructor(private readonly stripeService: StripeService) {}


    @Post('products')
    async createProduct(@Body() body: { name: string; description: string; price: number, currency: string, interval?: string }) {
        return this.stripeService.createProduct(body.name, body.description, body.price, body.currency, body.interval);
    }

    @Get('products')
    async getProducts() {
        return this.stripeService.getProducts();
    }
    
    @Post('customers')
    async createCustomer(@Body() body: { email: string; name: string }) {
        return this.stripeService.createCustomer(body.email, body.name);
    }

    @Get('customers')
    async getCustomers() {
        return this.stripeService.getCustomers();
    }

    @Post('create-payment-intent')
    async createPaymentIntent(@Body() body: { amount: number; currency: string }) {
        const { amount, currency } = body;
        return this.stripeService.createPaymentIntent(amount, currency);
    }
    
    // Retrieve Payment Intent Status
    @Post('payment-intent/:id')
    async getPaymentIntent(@Param('id') paymentIntentId: string) {
        return await this.stripeService.retrievePaymentIntent(paymentIntentId);
    }

    @Post('subscriptions')
    async createSubscription(@Body() body: { customerId: string; priceId: string }) {
        const { customerId, priceId } = body;
        return this.stripeService.createSubscription(customerId, priceId);
    }

    // Cancel Subscription
    @Post('subscription/cancel/:id')
    async cancelSubscription(@Param('id') subscriptionId: string) {
        return await this.stripeService.cancelSubscription(subscriptionId);
    }

    @Post('refunds')
    async refundPayment(@Body() body: { paymentIntentId: string }) {
        return this.stripeService.refundPayment(body.paymentIntentId);
    }

    @Post('payment-links')
    async createPaymentLink(@Body() body: { priceId: string }) {
        return this.stripeService.createPaymentLink(body.priceId);
    }

    @Get('balance')
    async getBalance() {
        return this.stripeService.getBalance();
    }

    // Webhook Endpoint
    @Post('webhook')
    async handleWebhook(@Req() req: Request, @Headers('stripe-signature') signature: string) {
        if (!signature) {
            throw new Error('Missing Stripe signature');
        }

        await this.stripeService.handleWebhook(req, signature);
        return { received: true };
    }

}