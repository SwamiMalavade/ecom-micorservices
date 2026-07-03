import { z } from "zod";

export const registerRequestDto = z
  .object({
    name: z
      .string()
      .trim()
      .min(2, "Name must be at least 2 characters.")
      .max(50, "Name cannot exceed 50 characters."),

    email: z.string().trim().toLowerCase().email("Invalid email format."),

    password: z
      .string()
      .min(8, "Password must be at least 8 characters.")
      .max(64, "Password cannot exceed 64 characters.")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter.")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter.")
      .regex(/[0-9]/, "Password must contain at least one number.")
      .regex(
        /[!@#$%^&*(),.?":{}|<>]/,
        "Password must contain at least one special character.",
      )
      .refine((value) => !/\s/.test(value), {
        message: "Password cannot contain spaces.",
      }),
  })
  .strict();

export type RegisterRequestDto = z.infer<typeof registerRequestDto>;
