import { IsNotEmpty, IsUUID } from 'class-validator';

export class CreateUserCourseAccessDto {
    @IsUUID()
    @IsNotEmpty()
    userId: number;

    @IsUUID()
    @IsNotEmpty()
    courseId: number;
}
