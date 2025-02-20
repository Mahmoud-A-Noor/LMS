import { Module } from '@nestjs/common';
import { PurchasesService } from './purchases.service';
import { PurchasesController } from './purchases.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Purchase } from './entities/purchase.entity';

@Module({
  imports: [MikroOrmModule.forFeature([Purchase])],
  controllers: [PurchasesController],
  providers: [PurchasesService],
})
export class PurchasesModule {}
