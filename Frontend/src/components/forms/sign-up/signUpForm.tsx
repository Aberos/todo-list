import { parseValidationErrorArray } from "@/common/utils";
import { useThemeContext } from "@/context/theme-context";
import { signUp } from "@/services/auth-service";
import { SignUpRequest, signUpSchema } from "@/types/sign-up";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { useForm } from "react-hook-form";

export default function SignUpForm() {
    const { showError, showSuccess } = useThemeContext();
    const router = useRouter();
    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting, isDirty, isValid },
    } = useForm<SignUpRequest>({
        resolver: zodResolver(signUpSchema),
    });

    async function onSubmit(data: any) {
        try {
            await signUp(signUpSchema.parse(data));
            showSuccess('Seu registro foi realizado com sucesso!');
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
            <label htmlFor="name" className="mb-2">Nome</label>
            <InputText {...register("name", { required: true })} type="text" id="name" className="w-full" />
            {errors?.name && (
                <p className="text-red-600 text-sm">
                    {errors?.name?.message}
                </p>
            )}
        </div>
        <div className="w-full flex flex-col mb-4">
            <label htmlFor="email" className="mb-2">E-mail</label>
            <InputText {...register("email", { required: true })} type="text" id="email" className="w-full" />
            {errors?.email && (
                <p className="text-red-600 text-sm">
                    {errors?.email?.message}
                </p>
            )}
        </div>
        <div className="w-full flex flex-col mb-4">
            <label htmlFor="password" className="mb-2">Senha</label>
            <InputText {...register("password", { required: true })} type="password" id="password" className="w-full" />
            {errors?.password && (
                <p className="text-red-600 text-sm">
                    {errors?.password?.message}
                </p>
            )}
        </div>
        <div className="w-full flex flex-col mb-4">
            <label htmlFor="confirmPassword" className="mb-2">Confirme a senha</label>
            <InputText {...register("confirmPassword", { required: true })} type="password" id="confirmPassword" className="w-full" />
            {errors?.confirmPassword && (
                <p className="text-red-600 text-sm">
                    {errors?.confirmPassword?.message}
                </p>
            )}
        </div>
        <div className="w-full flex justify-center md:justify-end items-center">
            <Button type="button" onClick={handleSignIn} disabled={isSubmitting} label="Voltar" severity="danger" />
            <Button type="submit" disabled={!isDirty || !isValid || isSubmitting} label="Registrar-se" className="ms-4" />
        </div>
    </form>);
}