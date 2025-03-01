import { Entity, PrimaryKey, Property, ManyToMany, Collection, Enum, OneToMany } from '@mikro-orm/core';
import { Course } from '../../courses/entities/course.entity';
import { ProductStatus } from '../../common/enums/product-status.enum';
import { Purchase } from '../../purchases/entities/purchase.entity';


@Entity({ tableName: 'products' })
export class Product {
    @PrimaryKey()
    id: string = crypto.randomUUID();

    @Property()
    name!: string;

    @Property()
    description!: string;

    @Property()
    imageUrl!: string;

    @Property({ type: 'decimal', precision: 10, scale: 2 })
    priceInDollars!: number;

    @Enum({ items: () => ProductStatus, default: ProductStatus.PRIVATE })
    status: ProductStatus = ProductStatus.PRIVATE;

    @Property({ type: 'timestamp', defaultRaw: 'CURRENT_TIMESTAMP' })
    createdAt: Date = new Date();

    @Property({ type: 'timestamp', defaultRaw: 'CURRENT_TIMESTAMP', onUpdate: () => new Date() })
    updatedAt: Date;
    
    
    @OneToMany(() => Purchase, purchase => purchase.product)
    purchases = new Collection<Purchase>(this);

    @ManyToMany(() => Course, course => course.products, { owner: true, pivotTable: 'product_courses' })
    courses = new Collection<Course>(this);

}
