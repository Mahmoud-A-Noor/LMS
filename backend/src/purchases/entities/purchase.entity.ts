import { Entity, ManyToOne, PrimaryKey, Property } from "@mikro-orm/core";
import { Product } from "../../products/entities/product.entity";
import { User } from "../../users/entities/user.entity";

@Entity({tableName: "purchases"})
export class Purchase {

    @PrimaryKey({type: "uuid"})
    id: string = crypto.randomUUID();

    @Property({type: "int", nullable: false})
    pricePaidInCents!: number;

    @Property({columnType: "json", nullable: false})
    productDetails!: {
        name: string;
        description: string;
        image_url: string;
    };

    @Property({type: "string", nullable: false, unique: true})
    stripeSessionId!: string;
    
    @Property({ type: 'timestamp' })
    refundedAt: Date;

    @Property({ type: 'timestamp', defaultRaw: 'CURRENT_TIMESTAMP' })
    createdAt: Date = new Date();

    @Property({ type: 'timestamp', defaultRaw: 'CURRENT_TIMESTAMP', onUpdate: () => new Date() })
    updatedAt: Date;


    @ManyToOne(() => User, { fieldName: 'user_id', deleteRule: 'RESTRICT' })
    user!: User;

    @ManyToOne(() => Product, { fieldName: 'product_id', deleteRule: 'RESTRICT' })
    product!: Product;
}
