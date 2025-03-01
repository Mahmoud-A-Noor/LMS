import { z } from "zod";

export const courseSchema = z.object({
  name: z.string().min(1, "Course Name Is Required"),
  description: z.string().min(1, "Course Description Is Required"),
});

