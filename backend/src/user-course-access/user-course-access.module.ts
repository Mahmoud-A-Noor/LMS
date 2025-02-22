import { Module } from '@nestjs/common';
import { UserCourseAccessService } from './user-course-access.service';
import { UserCourseAccessController } from './user-course-access.controller';
import { UserCourseAccess } from './entities/userCourseAccess.entity';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Course } from '../courses/entities/course.entity';
import { User } from '../users/entities/user.entity';
import { UsersModule } from '../users/users.module';
import { CoursesModule } from '../courses/courses.module';

@Module({
  imports: [UsersModule, CoursesModule,MikroOrmModule.forFeature([UserCourseAccess, User, Course])],
  providers: [UserCourseAccessService],
  controllers: [UserCourseAccessController]
})
export class UserCourseAccessModule {}
