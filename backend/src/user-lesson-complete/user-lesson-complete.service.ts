import { Injectable } from '@nestjs/common';
import { UserLessonComplete } from './entities/userLessonComplete.entity';
import { EntityRepository } from '@mikro-orm/mysql';
import { InjectRepository } from '@mikro-orm/nestjs';

@Injectable()
export class UserLessonCompleteService {
    constructor(
      @InjectRepository(UserLessonComplete)
      private readonly userLessonComplete: EntityRepository<UserLessonComplete>,
    ) {}


    async getUserCompletedLessons(req: any): Promise<string[]> {
        const userId = req.user.id;
        const completedLessons = await this.userLessonComplete.findAll({
            where: { user: userId },
            populate: ['lesson'],
        });

        return completedLessons.map(completion => completion.lesson.id);
    }
}
