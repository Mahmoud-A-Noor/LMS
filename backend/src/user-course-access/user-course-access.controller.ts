import { Controller } from '@nestjs/common';
import { UserCourseAccessService } from './user-course-access.service';

@Controller('user-course-access')
export class UserCourseAccessController {
  constructor(private readonly userCourseAccessService: UserCourseAccessService) {}

    
}
