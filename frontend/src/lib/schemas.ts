import { z } from "zod";

export const SignInSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(2, {
    message: "Please enter a valid password.",
  }),
});

export const SignUpSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(2, {
    message: "Please enter a valid password.",
  }),
  name: z.string().min(2, {
    message: "Please enter a valid name.",
  }),
});