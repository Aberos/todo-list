import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { UpdateAuthUserRequest, updateAuthUserSchema } from '@/types/auth/update-auth-user';
import { updateAuthUser } from '@/services/auth-service';
import { parseValidationErrorArray } from '@/common/utils';
import { useRouter } from 'next/router';
import { useThemeContext } from '@/context/theme-context';
import { Dialog } from 'primereact/dialog';
import UpdateAuthUserPasswordForm from '../update-auth-user-password/updateAuthUserPasswordForm';

export default function UpdateAuthUserForm() {
    const { showError, showSuccess } = useThemeContext();
    const router = useRouter();
    const [showModalUpdateAuthUserPassword, setShowModalUpdateAuthUserPassword] = useState<boolean>(false);

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors, isSubmitting, isDirty, isValid }
    } = useForm<UpdateAuthUserRequest>({
        resolver: zodResolver(updateAuthUserSchema)
    });

    useEffect(() => {
        const profile = JSON.parse(localStorage.getItem('profile') || '{}');
        if (profile) {
            setValue('email', profile.email);
            setValue('name', profile.name);
        }
    }, []);

    async function onSubmit(data: any) {
        try {
            const request = updateAuthUserSchema.parse(data);
            await updateAuthUser(request);
            showSuccess('Seu perfil foi atualizado!');
            localStorage.setItem(
                "profile",
                JSON.stringify({
                    name: request.name,
                    email: request.email,
                }),
            );
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
        router.push("/home");
    };

    const handleChangePassword = () => {
        setShowModalUpdateAuthUserPassword(true);
    };

    const closeDialogUpdateAuthUserPassword = () => {
        if (!showModalUpdateAuthUserPassword) return;
        setShowModalUpdateAuthUserPassword(false);
    };

    return (<>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-wrap">
            <div className="w-full flex flex-col mb-4">
                <label htmlFor="email" className="mb-2">Email</label>
                <InputText
                    {...register("email", { disabled: true })}
                    type="text"
                    id="email"
                    className="w-full"
                />
                {errors?.email && (
                    <p className="text-red-600 text-sm">{errors?.email?.message}</p>
                )}
            </div>
            <div className="w-full flex flex-col mb-4">
                <label htmlFor="name" className="mb-2">Nome</label>
                <InputText
                    {...register("name")}
                    type="text"
                    id="name"
                    className="w-full"
                />
                {errors?.name && (
                    <p className="text-red-600 text-sm">{errors?.name?.message}</p>
                )}
            </div>
            <div className="w-full flex flex-row md:flex-row-reverse flex-wrap">
                <div className='md:pl-1 mb-1 w-full md:w-1/4'>
                    <Button
                        className='w-full'
                        type="submit"
                        disabled={!isDirty || !isValid || isSubmitting}
                        label="Atualizar"
                    />
                </div>
                <div className='md:pl-1 mb-1 w-full md:w-2/4'>
                    <Button
                        className='w-full'
                        type="button"
                        label="Alterar Senha"
                        onClick={handleChangePassword}
                        severity="secondary"
                    />
                </div>
                <div className='mb-1 w-full md:w-1/4'>
                    <Button
                        className='w-full'
                        type="button"
                        label="Voltar"
                        onClick={handleBack}
                        severity="danger"
                    />
                </div>
            </div>
        </form>
        <Dialog
            header="Alterar Senha"
            visible={showModalUpdateAuthUserPassword}
            style={{ width: "20vw" }}
            breakpoints={{ '960px': '75vw', '641px': '90vw' }}
            onHide={closeDialogUpdateAuthUserPassword}
        >
            <UpdateAuthUserPasswordForm onClose={closeDialogUpdateAuthUserPassword} />
        </Dialog>
    </>
    );
}