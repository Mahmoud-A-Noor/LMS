import { Module } from '@nestjs/common';
import { UserLessonCompleteService } from './user-lesson-complete.service';
import { UserLessonCompleteController } from './user-lesson-complete.controller';
import { UserLessonComplete } from './entities/userLessonComplete.entity';
import { MikroOrmModule } from '@mikro-orm/nestjs';

@Module({
  imports: [MikroOrmModule.forFeature([UserLessonComplete])],
  providers: [UserLessonCompleteService],
  controllers: [UserLessonCompleteController]
})
export class UserLessonCompleteModule {}
