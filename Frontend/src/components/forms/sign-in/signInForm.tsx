import { parseValidationErrorArray } from "@/utils/utils";
import { useThemeContext } from "@/context/theme-context";
import { signIn } from "@/services/auth-service";
import { SignInRequest, signInSchema } from "@/@types/auth/sign-in";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import { Button } from "primereact/button";
import { Checkbox } from "primereact/checkbox";
import { InputText } from "primereact/inputtext";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export default function SignInForm() {
    const { showError } = useThemeContext();
    const router = useRouter();
    const [remember, setRemember] = useState<boolean>(false);

    const {
        handleSubmit,
        register,
        setValue,
        formState: { errors, isSubmitting, isDirty, isValid },
    } = useForm<SignInRequest>({
        resolver: zodResolver(signInSchema),
    });

    async function onSubmit(data: any) {
        try {
            const request = signInSchema.parse(data);
            const result = await signIn(request);
            localStorage.setItem("token", result?.data?.token);
            localStorage.setItem(
                "profile",
                JSON.stringify({
                    name: result?.data?.name,
                    email: result?.data?.email,
                }),
            );
            if (remember) {
                localStorage.setItem(
                    "auth",
                    JSON.stringify({ email: request.email, password: request.password }),
                );
            } else {
                const localAuth = localStorage.getItem("auth");
                if (localAuth) {
                    localStorage.removeItem("auth");
                }
            }
            router.push("/home");
        } catch (error: any) {
            if (parseValidationErrorArray(error?.response?.data)) {
                for (const validationError of parseValidationErrorArray(error.response.data)) {
                    showError(validationError.errorMessage);
                }
            } else {
                showError(error?.message);
            }
        }
    };

    function handleSignUp() {
        router.push("/auth/sign-up");
    };

    function handleRecoveryPassword() {
        router.push("/auth/recovery-password");
    };

    useEffect(() => {
        const rememberJson = localStorage.getItem("auth");
        if (rememberJson) {
            const remember = JSON.parse(rememberJson);
            if (remember) {
                setValue("email", remember.email, {
                    shouldDirty: true,
                    shouldValidate: true,
                });
                setValue("password", remember.password, {
                    shouldDirty: true,
                    shouldValidate: true,
                });
                setRemember(true);
            }
        }
    }, []);

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full flex flex-wrap"
        >
            <div className="w-full flex flex-col mb-4">
                <label htmlFor="email" className="mb-2">
                    E-mail
                </label>
                <InputText
                    {...register("email", { required: true })}
                    type="text"
                    id="email"
                    className="w-full"
                />
                {errors?.email && (
                    <p className="text-red-600 text-sm">{errors?.email?.message}</p>
                )}
            </div>
            <div className="w-full flex flex-col mb-4">
                <label htmlFor="password" className="mb-2">
                    Senha
                </label>
                <InputText
                    {...register("password", { required: true })}
                    type="password"
                    id="password"
                    className="w-full"
                />
                {errors?.password && (
                    <p className="text-red-600 text-sm">
                        {errors?.password?.message}
                    </p>
                )}
            </div>
            <div className="w-full flex flex-col mb-4">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="flex items-center mb-2 md:mb-0">
                        <Checkbox
                            id="remember"
                            onChange={(e) => setRemember(e.checked ?? false)}
                            checked={remember}
                        />
                        <label htmlFor="remember" className="ml-2">
                            Lembrar-me
                        </label>
                    </div>
                    <a onClick={handleRecoveryPassword} className="text-blue-500 underline cursor-pointer">
                        Recuperar senha
                    </a>
                </div>
            </div>
            <div className="w-full flex justify-center md:justify-end items-center">
                <Button
                    type="button"
                    onClick={handleSignUp}
                    disabled={isSubmitting}
                    label="Registrar-se"
                    severity="secondary"
                />
                <Button
                    type="submit"
                    disabled={!isDirty || !isValid || isSubmitting}
                    label="Entrar"
                    className="ms-4"
                />
            </div>
        </form>
    );
}