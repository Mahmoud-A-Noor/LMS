import { Controller, Get, Post, Put, Delete, Body, Param, HttpCode, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Roles } from '../auth/decorators/Role.decorator';
import { RolesGuard } from '../auth/guards/Role.guard';
import { UserRole } from '../common/enums/user-role.enum';

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}
  
    @UseGuards(RolesGuard)
    @Roles(UserRole.ADMIN)
    @Post()
    create(@Body() createProductDto: CreateProductDto) {
        return this.productsService.create(createProductDto);
    }

    @UseGuards(RolesGuard)
    @Roles(UserRole.ADMIN)
    @Get()
    findAll() {
        return this.productsService.findAll();
    }

    @Get("/public")
    findAllPublic() {
        return this.productsService.findAllPublic();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.productsService.findOne(id);
    }
  
    @UseGuards(RolesGuard)
    @Roles(UserRole.ADMIN)
    @Put(':id')
    update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
        return this.productsService.update(id, updateProductDto);
    }
  
    @UseGuards(RolesGuard)
    @Roles(UserRole.ADMIN)
    @Delete(':id')
    @HttpCode(204)
    remove(@Param('id') id: string) {
        return this.productsService.remove(id);
    }
  
    @UseGuards(RolesGuard)
    @Roles(UserRole.ADMIN)
    @Post(':id/courses/add')
    addCourses(
        @Param('id') id: string,
        @Body() body: { courseIds: string[] }
    ) {
        return this.productsService.addCourses(id, body.courseIds);
    }
  
    @UseGuards(RolesGuard)
    @Roles(UserRole.ADMIN)
    @Delete(':id/courses/remove')
    @HttpCode(204)
    removeCourses(
        @Param('id') id: string,
        @Body() body: { courseIds: string[] }
    ) {
        return this.productsService.removeCourses(id, body.courseIds);
    }
}
