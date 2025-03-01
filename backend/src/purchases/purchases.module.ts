import { forwardRef, Module } from '@nestjs/common';
import { PurchasesService } from './purchases.service';
import { PurchasesController } from './purchases.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Purchase } from './entities/purchase.entity';
import { Product } from '../products/entities/product.entity';
import { User } from '../users/entities/user.entity';
import { ProductsModule } from '../products/products.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [UsersModule, forwardRef(() => ProductsModule), MikroOrmModule.forFeature([Purchase, User, Product])],
  controllers: [PurchasesController],
  providers: [PurchasesService],
})
export class PurchasesModule {}
