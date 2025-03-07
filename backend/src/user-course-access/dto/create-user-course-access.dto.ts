import { IsNotEmpty, IsUUID } from 'class-validator';

export class CreateUserCourseAccessDto {
    @IsUUID()
    @IsNotEmpty()
    userId: string;

    @IsUUID()
    @IsNotEmpty()
    courseId: string;
}
