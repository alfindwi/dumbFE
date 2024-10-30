import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Please Enter a Valid Email Adrress"),
  password: z.string().min(6, "Password must be at least 8 characters long"),
});

export type LoginSchema = z.infer<typeof loginSchema>;
