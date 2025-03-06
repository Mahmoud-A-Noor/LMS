import { Inject, Injectable, Logger } from '@nestjs/common';
import Stripe from 'stripe';
import {Request} from "express"

@Injectable()
export class StripeCheckoutService {
  private stripe: Stripe;
  private readonly logger = new Logger(StripeCheckoutService.name);

  constructor(
    @Inject('STRIPE_API_KEY') private readonly apiKey: string,
  ) {
    if (!this.apiKey) throw new Error('Missing STRIPE_API_KEY');
    this.stripe = new Stripe(this.apiKey, { apiVersion: '2025-02-24.acacia' });
  }

  async createCheckoutSession(
    priceId: string,
    successUrl: string,
    cancelUrl: string
  ): Promise<Stripe.Checkout.Session> {
    try {
      const session = await this.stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price: priceId,
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: successUrl,
        cancel_url: cancelUrl,
      });

      this.logger.log(`Checkout session created: ${session.id}`);
      return session;
    } catch (error) {
      this.logger.error('Failed to create checkout session', error.stack);
      throw error;
    }
  }

  async retrieveCheckoutSession(sessionId: string): Promise<Stripe.Checkout.Session> {
    try {
      const session = await this.stripe.checkout.sessions.retrieve(sessionId);
      this.logger.log(`Checkout session retrieved: ${session.id}`);
      return session;
    } catch (error) {
      this.logger.error(`Failed to retrieve checkout session: ${sessionId}`, error.stack);
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
      
      case 'checkout.session.completed':
        const session = event.data.object as Stripe.Checkout.Session
        this.logger.log(`Checkout session completed: ${session.id}`);
        // TODO: Handle successful checkout 
        break;
      case 'checkout.session.expired':
          this.logger.warn(`Expired session: ${event.data.object.id}`);
          // TODO: Handle expired checkout 
          break;
      default:
          this.logger.log(`Unhandled event type: ${event.type}`);
    }
  }
}
