import { Module } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CoursesController } from './courses.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Course } from './entities/course.entity';
import { CourseSection } from './entities/courseSection.entity';
import { CoursesSectionService } from './course-section.service';
import { CoursesSectionController } from './course-section.controller';

@Module({
  imports: [MikroOrmModule.forFeature([Course, CourseSection])],
  providers: [CoursesService, CoursesSectionService],
  controllers: [CoursesController, CoursesSectionController]
})
export class CoursesModule {}
