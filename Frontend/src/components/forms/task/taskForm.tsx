import { parseValidationErrorArray } from "@/utils/utils";
import { useThemeContext } from "@/context/theme-context";
import { createTask, getTask, updateTask } from "@/services/task-service";
import { TaskRequest, taskSchema, taskStatusOptions } from "@/@types/task/task";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";

interface TaskFormProps {
    onClose: (update: boolean) => void;
    taskId?: string | null;
}

export default function TaskForm({ onClose, taskId }: TaskFormProps) {
    const { showError, showSuccess } = useThemeContext();

    const {
        register,
        handleSubmit,
        control,
        setValue,
        formState: { errors, isSubmitting, isDirty, isValid }
    } = useForm<TaskRequest>({
        resolver: zodResolver(taskSchema)
    });

    useEffect(() => {
        if (taskId) {
            getTask(taskId).then(response => {
                if (response.data) {
                    setValue('title', response.data.title);
                    setValue('description', response.data.description);
                    setValue('status', response.data.status);
                } else {
                    showError('Tarefa não encontrada');
                }
            }).catch(error => {
                showError('Erro ao buscar tarefa');
            });
        }
    }, [taskId]);

    async function onSubmit(data: any) {
        try {
            const request = taskSchema.parse(data);
            let message = 'Tarefa criada com sucesso';
            if (taskId) {
                await updateTask(taskId, request);
                message = 'Tarefa alterada com sucesso';
            } else {
                await createTask(request);
            }
            showSuccess(message);
            onClose(true);
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
        onClose(false);
    };

    return (<>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-wrap">
            <div className="w-full flex flex-col mb-4">
                <label htmlFor="title" className="mb-2">Titulo</label>
                <InputText
                    {...register("title")}
                    type="text"
                    id="title"
                    className="w-full"
                />
                {errors?.title && (
                    <p className="text-red-600 text-sm">{errors?.title?.message}</p>
                )}
            </div>
            <div className="w-full flex flex-col mb-4">
                <label htmlFor="description" className="mb-2">Descrição</label>
                <InputTextarea
                    {...register("description")}
                    id="description"
                    className="w-full"
                />
                {errors?.description && (
                    <p className="text-red-600 text-sm">{errors?.description?.message}</p>
                )}
            </div>
            <div className="w-full flex flex-col mb-4">
                <label htmlFor="confirmNewPassword" className="mb-2">Status</label>
                <Controller
                    name="status"
                    control={control}
                    render={({ field }) => (
                        <Dropdown
                            {...field}
                            value={field.value}
                            options={taskStatusOptions}
                            placeholder="Selecione o status"
                        />
                    )}
                />
                {errors?.status && (
                    <p className="text-red-600 text-sm">{errors?.status?.message}</p>
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
                    label="Salvar"
                />
            </div>
        </form>
    </>
    );
}