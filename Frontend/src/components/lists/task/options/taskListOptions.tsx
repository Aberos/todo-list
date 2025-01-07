import { TaskResponse } from "@/@types/task/task";
import { Button } from "primereact/button";

interface TaskListStatusProps {
    task: TaskResponse;
    onEdit: (task: TaskResponse) => void;
    onDelete: (task: TaskResponse) => void;
}

export default function TaskListOptions({ task, onEdit, onDelete }: TaskListStatusProps) {
    return (<div className="w-full flex flex-wrap items-center justify-center">
        <Button icon="pi pi-pencil" className="p-button-rounded" onClick={() => onEdit(task)}></Button>
        <Button icon="pi pi-trash" className="p-button-rounded ml-1 md:ml-2" severity="danger" onClick={() => onDelete(task)}></Button>
    </div>);
}