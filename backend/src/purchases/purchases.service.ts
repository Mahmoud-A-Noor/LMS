import { Injectable, NotFoundException, InternalServerErrorException, BadRequestException } from '@nestjs/common';
import { EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Purchase } from './entities/purchase.entity';
import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { UpdatePurchaseDto } from './dto/update-purchase.dto';
import { User } from '../users/entities/user.entity';
import { Product } from '../products/entities/product.entity';
import { PurchaseStatus } from '../common/enums/purchase.enum';
import { EntityManager } from '@mikro-orm/mysql';

@Injectable()
export class PurchasesService {
    constructor(
        private readonly em: EntityManager,
        @InjectRepository(Purchase)
        private readonly purchaseRepository: EntityRepository<Purchase>,
        @InjectRepository(User)
        private readonly userRepository: EntityRepository<User>,
        @InjectRepository(Product)
        private readonly productRepository: EntityRepository<Product>
    ) {}

    async create(createPurchaseDto: CreatePurchaseDto): Promise<Purchase> {
        try {
            const { userId, productId, stripeSessionId } = createPurchaseDto;

            const existingPurchase = await this.purchaseRepository.findOne({ user: userId, product: productId });
            if (existingPurchase) throw new BadRequestException('Purchase already exists');

            const user = await this.userRepository.findOne({ id: userId });
            if (!user) throw new NotFoundException('User not found');

            const product = await this.productRepository.findOne({ id: productId });
            if (!product) throw new NotFoundException('Product not found');

            const productInfo = {
              pricePaidInCents: product.priceInDollars * 100,
              productDetails: {
                  name: product.name,
                  description: product.description,
                  image_url: product.imageUrl,
              }
            }
            const purchase = this.purchaseRepository.create({
                ...productInfo,
                user,
                product,
                stripeSessionId
            });

            await this.purchaseRepository.getEntityManager().persistAndFlush(purchase);
            
            return purchase;
        } catch (error) {
            console.log(error)
            throw new InternalServerErrorException('Failed to create purchase');
        }
    }

    async findAll(): Promise<Purchase[]> {
        try {
            return await this.purchaseRepository.findAll({ populate: ['user', 'product'] });
        } catch (error) {
            throw new InternalServerErrorException('Failed to retrieve purchases');
        }
    }
    
    async findMyPurchases(req: any): Promise<Purchase[]> {
        try {
            return await this.purchaseRepository.findAll({
                where: { user: req.user.id },
              });
        } catch (error) {
            throw new InternalServerErrorException('Failed to retrieve purchases');
        }
    }

    async getTotalSales(){
        const netSalesResult = await this.em.createQueryBuilder(Purchase, 'p')
        .select('SUM(p.pricePaidInCents) / 100 as netSales')
        .where({ status: PurchaseStatus.PAID })
        .execute('get');

        const netSales = netSalesResult?.netSales || 0;

        // Get total refund value
        const refundResult = await this.em.createQueryBuilder(Purchase, 'p')
        .select('SUM(p.pricePaidInCents) / 100 as totalRefunds')
        .where({ status: PurchaseStatus.REFUNDED })
        .execute('get');

        const totalRefunds = refundResult?.totalRefunds || 0;

        // Get net purchases count
        const netPurchasesResult = await this.em.createQueryBuilder(Purchase, 'p')
        .select('COUNT(*) as netPurchases')
        .where({ status: PurchaseStatus.PAID })
        .execute('get');

        const netPurchases = netPurchasesResult?.netPurchases || 0;

        // Get refunded purchases count
        const refundedPurchasesResult = await this.em.createQueryBuilder(Purchase, 'p')
        .select('COUNT(*) as refundedPurchases')
        .where({ status: PurchaseStatus.REFUNDED })
        .execute('get');

        const refundedPurchases = refundedPurchasesResult?.refundedPurchases || 0;

        // Get average net purchases per customer
        const avgPurchasesResult = await this.em.createQueryBuilder(Purchase, 'p')
        .select('COUNT(*) / COUNT(DISTINCT p.user) as avgPurchasesPerCustomer')
        .where({ status: PurchaseStatus.PAID })
        .execute('get');

        const avgPurchasesPerCustomer = avgPurchasesResult?.avgPurchasesPerCustomer || 0;

        return {
            netSales,
            totalRefunds,
            netPurchases,
            refundedPurchases,
            avgPurchasesPerCustomer,
        };
    }

    async doesUserOwnCourse(body: {productId: string, userId: string}) {
        try {
            const purchase = await this.purchaseRepository.findOne({
                product: body.productId,
                user: body.userId,
                status: PurchaseStatus.PAID
            });
    
            return !!purchase;
        } catch (error) {
            console.log(error)
            throw new InternalServerErrorException('Failed to retrieve the purchase');
        }
    }

    async findOne(id: string): Promise<Purchase> {
        try {
            const purchase = await this.purchaseRepository.findOne({ id }, { populate: ['user', 'product'] });
            if (!purchase) throw new NotFoundException('Purchase not found');
            return purchase;
        } catch (error) {
            throw new InternalServerErrorException('Failed to retrieve the purchase');
        }
    }

    async findById(id: string): Promise<Purchase> {
        try {
            const purchase = await this.purchaseRepository.findOne({ id });
            if (!purchase) throw new NotFoundException('Purchase not found');
            return purchase;
        } catch (error) {
            throw new InternalServerErrorException('Failed to retrieve the purchase');
        }
    }

    async update(id: string, updatePurchaseDto: Omit<UpdatePurchaseDto, 'userId' | 'productId'>): Promise<Purchase> {
        try {
            const purchase = await this.findById(id);
            if (!purchase) throw new NotFoundException('Purchase not found');
            this.purchaseRepository.assign(purchase, updatePurchaseDto);
            await this.purchaseRepository.getEntityManager().persistAndFlush(purchase);
            return purchase;
        } catch (error) {
            console.log(error)
            throw new InternalServerErrorException('Failed to update the purchase');
        }
    }

    async delete(id: string): Promise<void> {
        try {
            const purchase = await this.findOne(id);
            if (!purchase) throw new NotFoundException('Purchase not found');
            await this.purchaseRepository.getEntityManager().removeAndFlush(purchase);
        } catch (error) {
            throw new InternalServerErrorException('Failed to delete the purchase');
        }
    }

}
