import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
import { UserLessonCompleteService } from './user-lesson-complete.service';

@Controller('user-lesson-complete')
export class UserLessonCompleteController {

    constructor(private readonly userLessonCompleteService: UserLessonCompleteService) {}

    @Get("/user-specific")
    getUserCompletedLessons(@Req() req: any){
        return this.userLessonCompleteService.getUserCompletedLessons(req);
    }

    @Post("/complete-lesson")
    completeLesson(@Body() body: {userId: string, lessonId: string}){
        return this.userLessonCompleteService.completeLesson(body);
    }

}
