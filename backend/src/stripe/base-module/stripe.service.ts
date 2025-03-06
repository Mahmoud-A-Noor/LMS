import { Inject, Injectable, Logger } from '@nestjs/common';
import Stripe from 'stripe';
import {Request} from "express"
import { ConfigService } from '@nestjs/config';

@Injectable()
export class StripeService {
    private stripe: Stripe;
    private readonly logger = new Logger(StripeService.name);

    constructor(
        @Inject('STRIPE_API_KEY') private readonly apiKey: string,
        @Inject('STRIPE_WEBHOOK_SECRET') private readonly webhookSecret: string,
      ) {
        if (!this.apiKey) throw new Error('Missing STRIPE_API_KEY');
        if (!this.webhookSecret) throw new Error('Missing STRIPE_WEBHOOK_SECRET');
    
        this.stripe = new Stripe(this.apiKey, { apiVersion: '2025-02-24.acacia' });
      }

  // Product & Pricing Management (Create Product with Price)
  async createProduct(
    name: string,
    description: string,
    price: number,
    currency: string = "usd",
    interval: string,
  ): Promise<Stripe.Product> {
    try {
      const product = await this.stripe.products.create({ name, description });
      const priceData: Stripe.PriceCreateParams = {
        product: product.id,
        unit_amount: price * 100, // amount in cents
        currency: currency,
      };

      if (interval) {
        priceData.recurring = { interval: interval as Stripe.Price.Recurring.Interval };
      }

      await this.stripe.prices.create(priceData);
      this.logger.log(`Product created successfully: ${name}`);
      return product;
    } catch (error) {
      this.logger.error('Failed to create product', error.stack);
      throw error;
    }
  }

  // Get Products
  async getProducts(): Promise<Stripe.Product[]> {
    try {
      const products = await this.stripe.products.list();
      this.logger.log('Products fetched successfully');
      return products.data;
    } catch (error) {
      this.logger.error('Failed to fetch products', error.stack);
      throw error;
    }
  }

  // Get Customers
  async getCustomers() {
    try {
      const customers = await this.stripe.customers.list({});
      this.logger.log('Customers fetched successfully');
      return customers.data;
    } catch (error) {
      this.logger.error('Failed to fetch products', error.stack);
      throw error;
    }
  }

  // Accept Payments (Create Payment Intent)
  async createPaymentIntent(
    amount: number,
    currency: string,
    paymentMethodId?: string
  ): Promise<Stripe.PaymentIntent> {
    try {
      const amountConverted = amount * 100
      const paymentIntent = await this.stripe.paymentIntents.create({
        amount: amountConverted,
        currency,
        payment_method: paymentMethodId,
        confirm: !!paymentMethodId,
      });
      this.logger.log(
        `PaymentIntent created successfully with amount: ${amount} ${currency}`,
      );
      return paymentIntent;
    } catch (error) {
      this.logger.error('Failed to create PaymentIntent', error.stack);
      throw error;
    }
  }

  // Retrieve Payment Intent
  async retrievePaymentIntent(paymentIntentId: string): Promise<Stripe.PaymentIntent> {
    try {
      const paymentIntent = await this.stripe.paymentIntents.retrieve(paymentIntentId);
      this.logger.log(`Retrieved PaymentIntent: ${paymentIntentId}`);
      return paymentIntent;
    } catch (error) {
      this.logger.error(`Failed to retrieve PaymentIntent: ${paymentIntentId}`, error.stack);
      throw error;
    }
  }

  // Subscriptions (Create Subscription)
  async createSubscription(
    customerId: string,
    priceId: string,
  ): Promise<Stripe.Subscription> {
    try {
      const subscription = await this.stripe.subscriptions.create({
        customer: customerId,
        items: [{ price: priceId }],
        payment_behavior: 'default_incomplete', // Ensures customer completes payment
        expand: ['latest_invoice.payment_intent'], // Get PaymentIntent for frontend
      });
      this.logger.log(
        `Subscription created successfully for customer ${customerId}`,
      );
      return subscription;
    } catch (error) {
      this.logger.error('Failed to create subscription', error.stack);
      throw error;
    }
  }

  // Cancel Subscription
  async cancelSubscription(subscriptionId: string): Promise<Stripe.Subscription> {
    try {
      const subscription = await this.stripe.subscriptions.cancel(subscriptionId);
      this.logger.log(`Subscription canceled successfully: ${subscriptionId}`);
      return subscription;
    } catch (error) {
      this.logger.error(`Failed to cancel subscription: ${subscriptionId}`, error.stack);
      throw error;
    }
  }

  // Customer Management (Create Customer)
  async createCustomer(email: string, name: string): Promise<Stripe.Customer> {
    try {
      const customer = await this.stripe.customers.create({ email, name });
      this.logger.log(`Customer created successfully with email: ${email}`);
      return customer;
    } catch (error) {
      this.logger.error('Failed to create customer', error.stack);
      throw error;
    }
  }

  // Refunds (Process Refund)
  async refundPayment(paymentIntentId: string): Promise<Stripe.Refund> {
    try {
      const refund = await this.stripe.refunds.create({
        payment_intent: paymentIntentId,
      });
      this.logger.log(
        `Refund processed successfully for PaymentIntent: ${paymentIntentId}`,
      );
      return refund;
    } catch (error) {
      this.logger.error('Failed to process refund', error.stack);
      throw error;
    }
  }

  // Reports and Analytics (Retrieve Balance)
  async getBalance(): Promise<Stripe.Balance> {
    try {
      const balance = await this.stripe.balance.retrieve();
      this.logger.log('Balance retrieved successfully');
      return balance;
    } catch (error) {
      this.logger.error('Failed to retrieve balance', error.stack);
      throw error;
    }
  }

  // Payment Links
  async createPaymentLink(priceId: string): Promise<Stripe.PaymentLink> {
    try {
      const paymentLink = await this.stripe.paymentLinks.create({
        line_items: [{ price: priceId, quantity: 1 }],
      });
      this.logger.log('Payment link created successfully');
      return paymentLink;
    } catch (error) {
      this.logger.error('Failed to create payment link', error.stack);
      throw error;
    }
  }

  // Handle Stripe Webhooks
  async handleWebhook(req: Request, signature: string): Promise<void> {
    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
    let event: Stripe.Event;
  
    try {
      event = this.stripe.webhooks.constructEvent(req.body, signature, endpointSecret);
    } catch (error) {
      this.logger.error('Webhook signature verification failed', error);
      throw new Error('Webhook verification failed');
    }
  
    switch (event.type) {
      case "checkout.session.completed":
        const session = event.data.object as Stripe.Checkout.Session
        this.logger.log(`Checkout session completed: ${session.id}`);
        // TODO: Handle successful checkout 
        break;
    
      case 'payment_intent.succeeded':
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        this.logger.log(`Payment successful: ${paymentIntent.id}`);
        // TODO: Update order status in database
        break;
  
      case 'payment_intent.payment_failed':
        const failedPayment = event.data.object as Stripe.PaymentIntent;
        this.logger.error(`Payment failed: ${failedPayment.id}`);
        // TODO: Handle failed payment (notify user, retry, etc.)
        break;
  
      case 'invoice.payment_succeeded':
        const invoice = event.data.object as Stripe.Invoice;
        this.logger.log(`Subscription payment successful: ${invoice.id}`);
        // TODO: Mark subscription as active in the database
        break;
  
      case 'customer.subscription.deleted':
        const subscription = event.data.object as Stripe.Subscription;
        this.logger.warn(`Subscription canceled: ${subscription.id}`);
        // TODO: Update user subscription status in database
        break;
  
      default:
        this.logger.log(`Unhandled event type: ${event.type}`);
    }
  }
}