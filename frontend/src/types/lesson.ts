import { LessonStatus } from "@/enums/LessonEnum";

export interface Lesson {
    id: string;
    name: string;
    status: LessonStatus;
    youtubeVideoId: string;
    description: string | null;
    sectionId: string
}