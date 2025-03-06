import { IsNotEmpty, IsNumber, IsString, IsUUID, IsObject, IsOptional } from 'class-validator';

export class CreatePurchaseDto {
    @IsString()
    @IsNotEmpty()
    stripeSessionId: string;

    @IsUUID()
    @IsNotEmpty()
    userId: string;

    @IsUUID()
    @IsNotEmpty()
    productId: string;
}