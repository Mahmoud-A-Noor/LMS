import { Controller, Get, Post, Body, Put, Param, Delete, HttpCode, UseGuards, Req } from '@nestjs/common';
import { PurchasesService } from './purchases.service';
import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { UpdatePurchaseDto } from './dto/update-purchase.dto';
import { Roles } from 'src/auth/decorators/Role.decorator';
import { RolesGuard } from 'src/auth/guards/Role.guard';
import { UserRole } from 'src/common/enums/user-role.enum';
import { Request } from 'express';

@Controller('purchases')
export class PurchasesController {
    constructor(private readonly purchasesService: PurchasesService) {}

      
    @UseGuards(RolesGuard)
    @Roles(UserRole.ADMIN)
    @Post()
    create(@Body() createPurchaseDto: CreatePurchaseDto) {
        return this.purchasesService.create(createPurchaseDto);
    }

    @Get()
    findAll() {
        return this.purchasesService.findAll();
    }

    @Get("mine")
    findMyPurchases(@Req() req: any){
        return this.purchasesService.findMyPurchases(req);
    }

    @Post('/user-own-product')
    doesUserOwnCourse(@Body() body: {productId: string, userId: string}) {
        return this.purchasesService.doesUserOwnCourse(body);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.purchasesService.findOne(id);
    }

}
