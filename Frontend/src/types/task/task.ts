import { z } from "@/common/zod-pt";
import { TaskStatus } from "@/enums/task-status";

export const taskSchema = z.object({
    title: z.string().nonempty(),
    description: z.string().nullable(),
    status: z.nativeEnum(TaskStatus),
});

export type TaskRequest = z.infer<typeof taskSchema>;

export type TaskFilterRequest = {
    search: string;
    status: TaskStatus[];
    page: number;
    pageSize: number;
}

export type TaskResponse = {
    title: string;
    description: string | null;
    status: TaskStatus;
    createdDate: Date;
}

export type TaskFilterResponse = {
    page: number;
    pageSize: number;
    totalCount: number;
    data: TaskResponse[];
}


export const taskStatusOptions: any[] = [
    { label: 'Pendente', value: 0 },
    { label: 'Em Progresso', value: 1 },
    { label: 'Completada', value: 2 },
    { label: 'Cancelada', value: 3 }
];