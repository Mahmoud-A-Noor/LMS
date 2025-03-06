import { Controller, Post, Body, Req, Headers } from '@nestjs/common';
import { StripeCustomService } from './stripe-custom.service';
import {Request} from "express"

@Controller('stripe-custom')
export class StripeCustomController {
    constructor(private readonly stripeCustomService: StripeCustomService) {}

    @Post('checkout')
    async createCheckoutSession(@Body() body: { productId: string; userId: string }) {
        return { sessionUrl: await this.stripeCustomService.createCheckoutSession(body.productId, body.userId) };
    }

    @Post('webhook')
    async handleWebhook(@Req() req: Request, @Headers('stripe-signature') signature: string) {
        if (!signature) {
            throw new Error('Missing Stripe signature');
        }

        await this.stripeCustomService.handleWebhook(req, signature);
        return { received: true };
    }
}
