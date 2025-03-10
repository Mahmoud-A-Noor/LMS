import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards, HttpCode } from '@nestjs/common';
import { LessonsService } from './lessons.service';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { RolesGuard } from '../auth/guards/Role.guard';
import { Roles } from '../auth/decorators/Role.decorator';
import { UserRole } from '../common/enums/user-role.enum';

@Controller('lessons')
export class LessonsController {
  constructor(private readonly lessonsService: LessonsService) {}

  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  @Post()
  create(@Body() createLessonDto: CreateLessonDto) {
    return this.lessonsService.create(createLessonDto);
  }

  @Get()
  findAll() {
    return this.lessonsService.findAll();
  }

  @Post("can-view-lesson")
  canUserViewLesson(@Body() body: {userId: string, lessonId: string}) {
    return this.lessonsService.canUserViewLesson(body);
  }

  @Post("is-lesson-completed")
  isLessonCompleted(@Body() body: {userId: string, lessonId: string}) {
    return this.lessonsService.isLessonCompleted(body);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.lessonsService.findOne(id);
  }

  @Get(':id/previous')
  findPrevious(@Param('id') id: string) {
    return this.lessonsService.findPrevious(id);
  }

  @Get(':id/next')
  findNext(@Param('id') id: string) {
    return this.lessonsService.findNext(id);
  }

  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  @Put('/order')
  updateOrder(@Body() body: {newOrder: string[]}) {
    return this.lessonsService.updateOrder(body.newOrder);
  }

  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  @Put(':id')
  update(@Param('id') id: string, @Body() updateLessonDto: UpdateLessonDto) {
    return this.lessonsService.update(id, updateLessonDto);
  }
  
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string) {
    return this.lessonsService.remove(id);
  }
}
