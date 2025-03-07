import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { StripeController } from './base-module/stripe.controller';
import { StripeService } from './base-module/stripe.service';
import { StripeCheckoutService } from './base-module/stripe-checkout.service';
import { StripeCheckoutController } from './base-module/stripe-checkout.controller';
import { StripeCustomController } from './stripe-custom-controller';
import { StripeCustomService } from './stripe-custom.service';
import { ProductsModule } from '../products/products.module';
import { PurchasesModule } from '../purchases/purchases.module';
import { UsersModule } from '../users/users.module';
import { Purchase } from '../purchases/entities/purchase.entity';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { UserCourseAccessModule } from '../user-course-access/user-course-access.module';

//? checkout this medium article to know more about this module ?//
// https://dev.to/slaknoah/seamless-payment-processing-with-stripe-and-nestjs-3cbg

@Module({})
export class StripeModule {
  static forRootAsync(): DynamicModule {
    return {
      module: StripeModule,
      controllers: [StripeController, StripeCheckoutController, StripeCustomController],
      imports: [MikroOrmModule.forFeature([Purchase]), ConfigModule.forRoot(), ProductsModule, PurchasesModule, UsersModule, UserCourseAccessModule],
      providers: [
        StripeService,
        StripeCheckoutService,
        StripeCustomService,
        {
          provide: 'STRIPE_API_KEY',
          inject: [ConfigService],
          useFactory: (configService: ConfigService) => configService.get<string>('STRIPE_API_KEY'),
        },
        {
          provide: 'STRIPE_WEBHOOK_SECRET',
          inject: [ConfigService],
          useFactory: (configService: ConfigService) => configService.get<string>('STRIPE_WEBHOOK_SECRET'),
        },
      ],
      exports: [StripeService, StripeCheckoutService, StripeCustomService]
    };
  }
}