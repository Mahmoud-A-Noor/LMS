import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    // DATABASE_URL: z.string().url(),
    // JWT_SECRET: z.string(),
  },
  client: {
    API_URL: z.string().url(),
  },
  runtimeEnv: {
    API_URL: process.env.NEXT_PUBLIC_API_URL,
  },
});