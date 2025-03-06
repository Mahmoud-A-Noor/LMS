import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/customExceptionFilter';
import { raw } from 'express';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.enableCors({
    origin: [
      process.env.FRONTEND_URL,
    ],
    credentials: true,
  });  
  
  app.use('/stripe/webhook', raw({ type: 'application/json' }));
  app.use("/stripe-checkout/webhook", raw({ type: "application/json" }));
  app.use('/stripe-custom/webhook', raw({ type: 'application/json' }));
  
  // app.useGlobalFilters(new HttpExceptionFilter())
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
