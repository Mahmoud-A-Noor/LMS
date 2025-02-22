import { PartialType } from '@nestjs/mapped-types';
import { CreateUserCourseAccessDto } from './create-user-course-access.dto';

export class UpdateUserCourseAccessDto extends PartialType(CreateUserCourseAccessDto) {}