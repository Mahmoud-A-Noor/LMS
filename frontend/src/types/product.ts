import { ProductStatus } from "@/enums/ProductStatus";

export interface Product {
    id: string;
    name: string;
    description: string,
    imageUrl: string,
    priceInDollars: number,
    status: ProductStatus
    courseCount: number,
    clientCount: number
}