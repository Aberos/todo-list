import { parseValidationErrorArray } from "@/utils/utils";
import { useThemeContext } from "@/context/theme-context";
import { updateAuthUserPassword } from "@/services/auth-service";
import { UpdateAuthUserPasswordRequest, updateAuthUserPasswordSchema } from "@/@types/auth/update-auth-user-password";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { useForm } from "react-hook-form";

interface UpdateAuthUserPasswordFormProps {
    onClose: () => void;
}

export default function UpdateAuthUserPasswordForm({ onClose }: UpdateAuthUserPasswordFormProps) {
    const { showError, showSuccess } = useThemeContext();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting, isDirty, isValid }
    } = useForm<UpdateAuthUserPasswordRequest>({
        resolver: zodResolver(updateAuthUserPasswordSchema)
    });

    async function onSubmit(data: any) {
        try {
            const request = updateAuthUserPasswordSchema.parse(data);
            await updateAuthUserPassword(request);
            showSuccess('Senha alterada!');
            onClose();
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

    const handleBack = () => {
        onClose();
    };

    return (<>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-wrap">
            <div className="w-full flex flex-col mb-4">
                <label htmlFor="password" className="mb-2">Senha atual</label>
                <InputText
                    {...register("password")}
                    type="password"
                    id="password"
                    className="w-full"
                />
                {errors?.password && (
                    <p className="text-red-600 text-sm">{errors?.password?.message}</p>
                )}
            </div>
            <div className="w-full flex flex-col mb-4">
                <label htmlFor="newPassword" className="mb-2">Nova senha</label>
                <InputText
                    {...register("newPassword")}
                    type="password"
                    id="newPassword"
                    className="w-full"
                />
                {errors?.newPassword && (
                    <p className="text-red-600 text-sm">{errors?.newPassword?.message}</p>
                )}
            </div>
            <div className="w-full flex flex-col mb-4">
                <label htmlFor="confirmNewPassword" className="mb-2">Confirme a nova senha</label>
                <InputText
                    {...register("confirmNewPassword")}
                    type="password"
                    id="confirmNewPassword"
                    className="w-full"
                />
                {errors?.confirmNewPassword && (
                    <p className="text-red-600 text-sm">{errors?.confirmNewPassword?.message}</p>
                )}
            </div>
            <div className="w-full flex justify-center md:justify-end items-center">
                <Button
                    type="button"
                    label="Voltar"
                    onClick={handleBack}
                    severity="danger"
                />
                <Button
                    className='ml-2'
                    type="submit"
                    disabled={!isDirty || !isValid || isSubmitting}
                    label="Alterar"
                />
            </div>
        </form>
    </>
    );
}