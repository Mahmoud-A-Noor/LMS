import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Product } from './entities/product.entity';
import { CoursesModule } from 'src/courses/courses.module';
import { Course } from '../courses/entities/course.entity';

@Module({
  imports: [MikroOrmModule.forFeature([Product, Course]), CoursesModule],
  providers: [ProductsService],
  controllers: [ProductsController]
})
export class ProductsModule {}
