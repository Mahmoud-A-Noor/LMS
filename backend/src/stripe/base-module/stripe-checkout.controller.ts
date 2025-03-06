import { Controller, Post, Get, Param, Body, Req, Headers } from '@nestjs/common';
import { StripeCheckoutService } from './stripe-checkout.service';
import {Request} from "express"

@Controller('stripe-checkout')
export class StripeCheckoutController {
  constructor(private readonly stripeCheckoutService: StripeCheckoutService) {}

  @Post('create-session')
  async createCheckoutSession(
    @Body('priceId') priceId: string,
    @Body('successUrl') successUrl: string,
    @Body('cancelUrl') cancelUrl: string
  ) {
    return this.stripeCheckoutService.createCheckoutSession(priceId, successUrl, cancelUrl);
  }

  @Get('session/:id')
  async retrieveCheckoutSession(@Param('id') sessionId: string) {
    return this.stripeCheckoutService.retrieveCheckoutSession(sessionId);
  }

  @Post('webhook')
  async handleWebhook(@Req() req: Request, @Headers('stripe-signature') signature: string) {
      if (!signature) {
          throw new Error('Missing Stripe signature');
      }

      await this.stripeCheckoutService.handleWebhook(req, signature);
      return { received: true };
  }
}
