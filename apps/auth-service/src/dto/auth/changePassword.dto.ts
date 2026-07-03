import { z } from "zod";

export const ChangePasswordDto = z
  .object({
    currentPassword: z
      .string()
      .min(8, "Password must be at least 8 characters"),

    newPassword: z.string().min(8, "Password must be at least 8 characters"),
  })
  .strict();

export type ChangePasswordDto = z.infer<typeof ChangePasswordDto>;
