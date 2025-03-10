import { BadRequestException, Injectable } from '@nestjs/common';
import { UserLessonComplete } from './entities/userLessonComplete.entity';
import { EntityRepository } from '@mikro-orm/mysql';
import { InjectRepository } from '@mikro-orm/nestjs';
import { User } from '../users/entities/user.entity';
import { Lesson } from '../lessons/entities/lesson.entity';

@Injectable()
export class UserLessonCompleteService {
    constructor(
      @InjectRepository(UserLessonComplete)
      private readonly userLessonComplete: EntityRepository<UserLessonComplete>,
      @InjectRepository(User)
      private readonly userRepository: EntityRepository<User>,
      @InjectRepository(Lesson)
      private readonly lessonRepository: EntityRepository<Lesson>,
    ) {}


    async getUserCompletedLessons(req: any): Promise<string[]> {
        const userId = req.user.id;
        const completedLessons = await this.userLessonComplete.findAll({
            where: { user: userId },
            populate: ['lesson'],
        });

        return completedLessons.map(completion => completion.lesson.id);
    }

    async completeLesson(body: {userId: string, lessonId: string}){
        const alreadyCompleted = await this.userLessonComplete.findOne({
            user: body.userId,
            lesson: body.lessonId,
        })
        if(alreadyCompleted) {
            await this.userLessonComplete.getEntityManager().removeAndFlush(alreadyCompleted);
            return;
        }

        const user = await this.userRepository.findOne(body.userId);
        const lesson = await this.lessonRepository.findOne(body.lessonId)
        this.userLessonComplete.create({
            user,
            lesson,
        })
        await this.userLessonComplete.getEntityManager().flush()
    }

}
