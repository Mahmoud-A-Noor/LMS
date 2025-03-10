import { Module } from '@nestjs/common';
import { UserLessonCompleteService } from './user-lesson-complete.service';
import { UserLessonCompleteController } from './user-lesson-complete.controller';
import { UserLessonComplete } from './entities/userLessonComplete.entity';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { User } from '../users/entities/user.entity';
import { Lesson } from '../lessons/entities/lesson.entity';

@Module({
  imports: [MikroOrmModule.forFeature([UserLessonComplete, User, Lesson])],
  providers: [UserLessonCompleteService],
  controllers: [UserLessonCompleteController]
})
export class UserLessonCompleteModule {}
