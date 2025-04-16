import { z } from "zod";

export const image = z.instanceof(File).nullable();
export const signUpSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Invalid password length"),
  avatar: image,
});

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Invalid password length"),
});
