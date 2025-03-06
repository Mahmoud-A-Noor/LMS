import { PartialType } from '@nestjs/mapped-types';
import { CreatePurchaseDto } from './create-purchase.dto';
import { IsDate, IsEnum, IsString } from 'class-validator';
import { PurchaseStatus } from '../../common/enums/purchase.enum';

export class UpdatePurchaseDto extends PartialType(CreatePurchaseDto) {
    @IsEnum(PurchaseStatus)
    status?: PurchaseStatus

    @IsString()
    stripePaymentIntentId?: string

    @IsDate()
    refundedAt?: Date
}
