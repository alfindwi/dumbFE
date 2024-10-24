import { z } from "zod";

const regexPassword = {
  regex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
};

export const loginSchema = z.object({
  email: z.string().email("Please Enter a Valid Email Adrress"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .regex(
      regexPassword.regex,
      "Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character"
    ),
});

export type LoginSchema = z.infer<typeof loginSchema>;

