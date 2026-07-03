import { z } from "zod";

export const LoginRequestDto = z
  .object({
    email: z.string().trim().toLowerCase().email("Invalid email format."),
    password: z.string().min(1, "Password is required"),
  })
  .strict();

export type LoginRequestDto = z.infer<typeof LoginRequestDto>;
