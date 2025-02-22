import { Controller, Get, Post, Body, Put, Param, Delete, InternalServerErrorException, UseGuards, HttpCode } from '@nestjs/common';
import { RolesGuard } from '../auth/guards/Role.guard';
import { UserRole } from '../common/enums/user-role.enum';
import { Roles } from '../auth/decorators/Role.decorator';
import { CreateCourseSectionDto } from './dto/create-course-section.dto';
import { CoursesSectionService } from './course-section.service';
import { UpdateCourseSectionDto } from './dto/update-course-section.dto';

@Controller('course-section')
export class CoursesSectionController {
  constructor(private readonly coursesSectionService: CoursesSectionService) {}

    @UseGuards(RolesGuard)
    @Roles(UserRole.ADMIN)
    @Post()
    create(@Body() createCourseSectionDto: CreateCourseSectionDto) {
        return this.coursesSectionService.create(createCourseSectionDto);
    }

    @Get()
    findAll() {
        return this.coursesSectionService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.coursesSectionService.findOne(id);
    }

    @UseGuards(RolesGuard)
    @Roles(UserRole.ADMIN)
    @Put(':id')
    update(@Param('id') id: string, @Body() updateCourseSectionDto: UpdateCourseSectionDto) {
        return this.coursesSectionService.update(id, updateCourseSectionDto);
    }

    @UseGuards(RolesGuard)
    @Roles(UserRole.ADMIN)
    @Delete(':id')
    @HttpCode(204)
    async remove(@Param('id') id: string) {
        return await this.coursesSectionService.remove(id);
    }
}
