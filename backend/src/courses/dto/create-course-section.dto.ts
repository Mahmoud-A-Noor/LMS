import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';
import { SectionStatus } from '../../common/enums/section-status';

export class CreateCourseSectionDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsEnum(SectionStatus)
    @IsOptional()
    status: SectionStatus;

    @IsNumber()
    @IsOptional()
    order: number;

    @IsUUID()
    @IsNotEmpty()
    courseId: string;
}
