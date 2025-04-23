import { z } from "zod";

export const uriSchema = z.object({
  longUrl: z.string().url("Invalid URL"),
});
