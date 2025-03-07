import { Controller, Post, Body, Req, Headers, Get, Param } from '@nestjs/common';
import { StripeCustomService } from './stripe-custom.service';
import {Request} from "express"

@Controller('stripe-custom')
export class StripeCustomController {
    constructor(private readonly stripeCustomService: StripeCustomService) {}

    @Get('receipt/:paymentIntentId')
    async getReceiptUrl(@Param("paymentIntentId") paymentIntentId: string) {
        return { receiptUrl: await this.stripeCustomService.getReceiptUrl(paymentIntentId) };
    }

    @Post('refund/:paymentIntentId')
    async refundPayment(@Param("paymentIntentId") paymentIntentId: string) {
        return this.stripeCustomService.refundPayment(paymentIntentId);
    }

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
