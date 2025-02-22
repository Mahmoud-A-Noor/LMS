import { Controller, Get, Post, Body, Put, Param, Delete, HttpCode, UseGuards } from '@nestjs/common';
import { PurchasesService } from './purchases.service';
import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { UpdatePurchaseDto } from './dto/update-purchase.dto';
import { Roles } from 'src/auth/decorators/Role.decorator';
import { RolesGuard } from 'src/auth/guards/Role.guard';
import { UserRole } from 'src/common/enums/user-role.enum';

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

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.purchasesService.findOne(id);
    }
}
