import { LessonStatus } from "@/enums/LessonEnum";
import { z } from "zod";

export const lessonSchema = z.object({
    name: z.string().min(1, "Required"),
    sectionId: z.string().min(1, "Required"),
    status: z.enum(Object.values(LessonStatus) as [string, ...string[]]),
    youtubeVideoId: z.string().min(1, "Required"),
    description: z.string().transform((value)=>(value === "" ? null : value)).nullable(),
});