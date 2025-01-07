import { z } from "@/utils/zod-pt";

export const updateAuthUserSchema = z.object({
    email: z.string().email(),
    name: z.string().min(3),
});

export type UpdateAuthUserRequest = z.infer<typeof updateAuthUserSchema>;