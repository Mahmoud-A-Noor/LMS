import { PartialType, OmitType } from "@nestjs/mapped-types";
import { CreateCourseSectionDto } from "./create-course-section.dto";

export class UpdateCourseSectionDto extends OmitType(
  PartialType(CreateCourseSectionDto),
  ['courseId'] as const // we don't want to be able to update courseId
) {}