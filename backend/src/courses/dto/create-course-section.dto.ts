import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateCourseSectionDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsUUID()
    @IsNotEmpty()
    courseId: string;
}
