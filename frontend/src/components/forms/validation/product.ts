import { ProductStatus } from "@/enums/ProductStatus";
import { z } from "zod";

export const productSchema = z.object({
    name: z.string().min(1, "Required"),
    priceInDollars: z.number().int().nonnegative(),
    description: z.string().min(1, "Required"),
    imageUrl: z.union([
        z.string().url("Invalid URL"),
        z.string().startsWith("/", "Invalid URL")
    ]),
    status: z.enum(Object.values(ProductStatus) as [string, ...string[]]),
    courseIds: z.array(z.string()).min(1, "At least 1 course is required")
});