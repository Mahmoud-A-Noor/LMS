import { SectionStatus } from "@/enums/SectionEnum";
import { Lesson } from "./lesson";

export interface Section {
    id: string;
    name: string;
    status: SectionStatus,
    lessons: Lesson[]
}