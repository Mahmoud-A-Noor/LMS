import { IsNotEmpty, IsNumber, IsString, IsOptional, IsArray, IsUUID } from 'class-validator';
import { ProductStatus } from '../../common/enums/product-status.enum';


export class CreateProductDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsString()
    @IsNotEmpty()
    imageUrl: string;

    @IsNumber()
    @IsNotEmpty()
    priceInDollars: number;

    @IsOptional()
    status?: ProductStatus;

    @IsArray()
    @IsOptional()
    courseIds?: string[];
}