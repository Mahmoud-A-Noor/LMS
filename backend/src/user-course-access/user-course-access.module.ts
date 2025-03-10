import { forwardRef, Module } from '@nestjs/common';
import { UserCourseAccessService } from './user-course-access.service';
import { UserCourseAccessController } from './user-course-access.controller';
import { UserCourseAccess } from './entities/userCourseAccess.entity';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Course } from '../courses/entities/course.entity';
import { User } from '../users/entities/user.entity';
import { UsersModule } from '../users/users.module';
import { CoursesModule } from '../courses/courses.module';
import { ProductsModule } from '../products/products.module';
import { Product } from '../products/entities/product.entity';
import { Lesson } from '../lessons/entities/lesson.entity';
import { UserLessonComplete } from '../user-lesson-complete/entities/userLessonComplete.entity';

@Module({
  imports: [UsersModule, forwardRef(() => ProductsModule), forwardRef(() => CoursesModule), MikroOrmModule.forFeature([UserCourseAccess, UserLessonComplete, User, Course, Lesson, Product])],
  exports: [UserCourseAccessService],
  providers: [UserCourseAccessService],
  controllers: [UserCourseAccessController]
})
export class UserCourseAccessModule {}
