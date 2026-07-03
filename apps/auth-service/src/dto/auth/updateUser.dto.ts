import z from "zod";

export const UpdateUserDto = z.object({
  name: z.string().trim().min(2).optional(),
  email: z.string().email().optional(),
}).strict();

export type UpdateUserDto = z.infer<typeof UpdateUserDto>;