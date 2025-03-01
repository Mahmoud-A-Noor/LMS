import { forwardRef, Module } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CoursesController } from './courses.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Course } from './entities/course.entity';
import { CourseSection } from './entities/courseSection.entity';
import { CoursesSectionService } from './course-section.service';
import { CoursesSectionController } from './course-section.controller';
import { LessonsModule } from 'src/lessons/lessons.module';
import { UserCourseAccessModule } from 'src/user-course-access/user-course-access.module';
import { Lesson } from 'src/lessons/entities/lesson.entity';
import { UserCourseAccess } from 'src/user-course-access/entities/userCourseAccess.entity';

@Module({
  imports: [MikroOrmModule.forFeature([Course, CourseSection, Lesson, UserCourseAccess]), LessonsModule, forwardRef(() => UserCourseAccessModule)],
  providers: [CoursesService, CoursesSectionService],
  controllers: [CoursesController, CoursesSectionController]
})
export class CoursesModule {}
