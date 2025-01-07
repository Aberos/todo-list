import { z } from "@/utils/zod-pt";

export const recoveryPasswordSchema = z.object({
    email: z.string(),
});

export type RecoveryPasswordRequest = z.infer<typeof recoveryPasswordSchema>;