import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards, HttpCode } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { RolesGuard } from '../auth/guards/Role.guard';
import { UserRole } from '../common/enums/user-role.enum';
import { Roles } from '../auth/decorators/Role.decorator';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

    @UseGuards(RolesGuard)
    @Roles(UserRole.ADMIN)
    @Post()
    create(@Body() createCourseDto: CreateCourseDto) {
        return this.coursesService.create(createCourseDto);
    }

    @Get()
    findAll() {
        return this.coursesService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.coursesService.findOne(id);
    }

    @UseGuards(RolesGuard)
    @Roles(UserRole.ADMIN)
    @Put(':id')
    update(@Param('id') id: string, @Body() updateCourseDto: UpdateCourseDto) {
        return this.coursesService.update(id, updateCourseDto);
    }

    @UseGuards(RolesGuard)
    @Roles(UserRole.ADMIN)
    @Delete(':id')
    @HttpCode(204)
    async remove(@Param('id') id: string) {
        return await this.coursesService.remove(id);
    }
}
