import { z } from "zod";


export const createUrlSchema = z.object({
  userAgent: z.string().optional(),
  longUrl: z.string().url(),
  ipAddress: z.string().optional(),
});
