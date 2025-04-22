import { z } from "zod";


export const createUrlSchema = z.object({
  userAgent: z.string().optional(),
  longUrl: z.string().url(),
  ipAddress: z.string().optional(),
});

export const getUrlSchema = z.object({
  userAgent: z.string().optional(),
  shortUrl: z.string(),
  ipAddress: z.string().optional(),
});


export const updateActiveStatusSchema = z.object({
  shortUrl: z.string(),
  isActive: z.boolean(),
});