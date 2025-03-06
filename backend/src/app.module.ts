import { MiddlewareConsumer, RequestMethod, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { MikroOrmModule } from '@mikro-orm/nestjs';
import mikroOrmConfig from './mikro-orm.config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LessonsModule } from './lessons/lessons.module';
import { PurchasesModule } from './purchases/purchases.module';
import { ProductsModule } from './products/products.module';
import { CoursesModule } from './courses/courses.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/guards/Auth.guard';
import { UserCourseAccessModule } from './user-course-access/user-course-access.module';
import { UserLessonCompleteModule } from './user-lesson-complete/user-lesson-complete.module';
import { StripeModule } from './stripe/stripe.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
    }),
    MikroOrmModule.forRoot(mikroOrmConfig),
    CoursesModule,
    LessonsModule,
    PurchasesModule,
    ProductsModule,
    UsersModule,
    AuthModule,
    UserCourseAccessModule,
    UserLessonCompleteModule,
    StripeModule.forRootAsync()
  ],
  controllers: [AppController],
  providers: [AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
