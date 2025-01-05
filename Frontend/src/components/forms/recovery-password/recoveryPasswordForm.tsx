import { parseValidationErrorArray } from "@/common/utils";
import { useThemeContext } from "@/context/theme-context";
import { recoveryPassword } from "@/services/auth-service";
import { RecoveryPasswordRequest, recoveryPasswordSchema } from "@/types/recovery-password";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { useForm } from "react-hook-form";

export default function RecoveryPasswordForm() {
    const { showError, showSuccess } = useThemeContext();
    const router = useRouter();
    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting, isDirty, isValid },
    } = useForm<RecoveryPasswordRequest>({
        resolver: zodResolver(recoveryPasswordSchema),
    });

    async function onSubmit(data: any) {
        try {
            await recoveryPassword(recoveryPasswordSchema.parse(data));
            showSuccess('Caso o seu e-mail esteja cadastrado em nosso sistema, você receberá uma nova senha em sua caixa de entrada.')
            router.push("/auth/sign-in");
        } catch (error: any) {
            if (parseValidationErrorArray(error?.response?.data)) {
                for (const validationError of parseValidationErrorArray(error.response.data)) {
                    showError(validationError.errorMessage)
                }
            } else {
                showError(error?.message)
            }
        }
    };

    function handleSignIn() {
        router.push("/auth/sign-in");
    };

    return (<form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex flex-wrap">
        <div className="w-full flex flex-col mb-4">
            <label htmlFor="email" className="mb-2">E-mail</label>
            <InputText {...register("email", { required: true })} type="text" id="email" className="w-full" />
            {errors?.email && (
                <p className="text-red-600 text-sm">
                    {errors?.email?.message}
                </p>
            )}
        </div>
        <div className="w-full flex justify-center md:justify-end items-center">
            <Button type="button" onClick={handleSignIn} disabled={isSubmitting} label="Voltar" severity="secondary" />
            <Button type="submit" disabled={!isDirty || !isValid || isSubmitting} label="Recuperar" className="ms-4" />
        </div>
    </form>);
}