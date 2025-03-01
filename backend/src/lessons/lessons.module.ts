import { Module } from '@nestjs/common';
import { LessonsService } from './lessons.service';
import { LessonsController } from './lessons.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Lesson } from './entities/lesson.entity';

@Module({
  imports: [MikroOrmModule.forFeature([Lesson])],
  controllers: [LessonsController],
  providers: [LessonsService],
  exports: [LessonsService]
})
export class LessonsModule {}
