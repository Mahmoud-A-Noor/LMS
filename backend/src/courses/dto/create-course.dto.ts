import { IsEnum, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { CourseStatus } from 'src/common/enums/course-status.enum';

export class CreateCourseDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsEnum(CourseStatus)
    @IsOptional()
    status: CourseStatus;

}
