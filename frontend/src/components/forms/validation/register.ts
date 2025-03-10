import { z } from "zod";

export const registerSchema = z.object({
    username: z.string().min(5, "Password must be at least 5 characters").max(30, "Password must be at most 30 characters"),
    email: z.string().email("Invalid email format"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
  }).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});