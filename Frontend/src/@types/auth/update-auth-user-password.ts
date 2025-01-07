import { z } from "@/utils/zod-pt";

export const updateAuthUserPasswordSchema = z.object({
    password: z.string().min(6),
    newPassword: z.string().min(6),
    confirmNewPassword: z.string().min(6),
}).refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Novas senhas não conferem",
    path: ["confirmPassword"],
});

export type UpdateAuthUserPasswordRequest = z.infer<typeof updateAuthUserPasswordSchema>;
