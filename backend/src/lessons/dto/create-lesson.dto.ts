import { IsEnum, IsNotEmpty, IsOptional, IsString, IsInt } from 'class-validator';
import { LessonStatus } from '../../common/enums/lesson-status.enum';

export class CreateLessonDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsString()
    @IsNotEmpty()
    youtubeVideoId: string;

    @IsInt()
    @IsNotEmpty()
    order: number;

    @IsEnum(LessonStatus)
    @IsOptional()
    status?: LessonStatus;

    @IsString()
    @IsNotEmpty()
    courseSectionId: string;
}