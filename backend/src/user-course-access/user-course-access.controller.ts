import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { UserCourseAccessService } from './user-course-access.service';

@Controller('user-course-accesses')
export class UserCourseAccessController {
  constructor(private readonly userCourseAccessService: UserCourseAccessService) {}

  @Get("/user-courses")
  async getUserCourses(@Req() req: any){
    return this.userCourseAccessService.getUserCourses(req.user.id);
  }

  @Post("/add")
  async addAccess(@Body() body: {userId: string, productId: string}){
    await this.userCourseAccessService.addProductCoursesUserAccess(body.userId, body.productId);
  }

  @Post("/remove")
  async removeAccess(@Body() body: {userId: string, productId: string}){
    await this.userCourseAccessService.removeProductCoursesUserAccess(body.userId, body.productId);
  }
  
}
