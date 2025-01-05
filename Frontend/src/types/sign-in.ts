import { z } from "@/common/zod-pt";

export const signInSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6)
});

export type SignInRequest = z.infer<typeof signInSchema>;

export type SignInResponse = {
    token: string;
    name: string;
    email: string;
}
