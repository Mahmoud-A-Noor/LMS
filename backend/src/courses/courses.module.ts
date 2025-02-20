import { Module } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CoursesController } from './courses.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Course } from './entities/course.entity';
import { CourseSection } from './entities/courseSection.entity';
import { UserCourseAccess } from './entities/userCourseAccess.entity';

@Module({
  imports: [MikroOrmModule.forFeature([Course, CourseSection, UserCourseAccess])],
  providers: [CoursesService],
  controllers: [CoursesController]
})
export class CoursesModule {}
