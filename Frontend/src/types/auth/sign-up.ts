import { z } from "@/common/zod-pt";

export const signUpSchema = z.object({
    email: z.string().email(),
    name: z.string().min(3),
    password: z.string().min(6),
    confirmPassword: z.string().min(6),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Senhas não conferem",
    path: ["confirmPassword"],
});

export type SignUpRequest = z.infer<typeof signUpSchema>;
