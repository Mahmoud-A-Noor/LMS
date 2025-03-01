import { z } from "zod";

export const sectionSchema = z.object({
  name: z.string().min(1, "Course Name Is Required"),
  status: z.enum(["private", "public"]),
});

