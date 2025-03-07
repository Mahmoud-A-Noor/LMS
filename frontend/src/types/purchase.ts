import { PurchaseStatus } from "@/enums/PurchaseEnum";
import { User } from "./user";
import { Product } from "./product";

export interface Purchase {
    id: string;
    pricePaidInCents: number;
    productDetails : {
        name: string;
        description: string,
        image_url: string,
    }
    stripeSessionId: string,
    stripePaymentIntentId: string,
    status: PurchaseStatus,
    user: User
    product: Product
    refundedAt: Date
    createdAt: Date
}