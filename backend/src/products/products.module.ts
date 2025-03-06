import { forwardRef, Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Product } from './entities/product.entity';
import { CoursesModule } from '../courses/courses.module';
import { Course } from '../courses/entities/course.entity';
import { PurchasesModule } from '../purchases/purchases.module';
import { Purchase } from '../purchases/entities/purchase.entity';

@Module({
  imports: [MikroOrmModule.forFeature([Product, Course, Purchase]), CoursesModule, forwardRef(() => PurchasesModule)],
  exports: [ProductsService],
  providers: [ProductsService],
  controllers: [ProductsController]
})
export class ProductsModule {}
