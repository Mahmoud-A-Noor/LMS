import { IsEnum, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { CourseStatus } from 'src/common/enums/course-status.enum';

export class CreateCourseDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsEnum(CourseStatus)
    @IsOptional()
    status: CourseStatus;

    @IsInt()
    @IsNotEmpty()
    order: number;
}
