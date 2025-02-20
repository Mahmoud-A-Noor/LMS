import { Entity, PrimaryKey, Property, ManyToMany, Collection, Enum } from '@mikro-orm/core';
import { Course } from '../../courses/entities/course.entity';

export enum ProductStatus {
    PUBLIC = 'public',
    PRIVATE = 'private',
}

@Entity({ tableName: 'products' })
export class Product {
    @PrimaryKey()
    id: string = crypto.randomUUID();

    @Property()
    name!: string;

    @Property()
    description!: string;

    @Property()
    image_url!: string;

    @Property({ type: 'decimal', precision: 10, scale: 2 })
    price_in_dollars!: number;

    @Enum({ items: () => ProductStatus, default: ProductStatus.PRIVATE })
    status: ProductStatus = ProductStatus.PRIVATE;

    @Property({ type: 'timestamp', defaultRaw: 'CURRENT_TIMESTAMP' })
    createdAt: Date = new Date();

    @Property({ type: 'timestamp', defaultRaw: 'CURRENT_TIMESTAMP', onUpdate: () => new Date() })
    updatedAt: Date;
    


    @ManyToMany(() => Course, course => course.products, { owner: true, pivotTable: 'product_courses' })
    courses = new Collection<Course>(this);
}
