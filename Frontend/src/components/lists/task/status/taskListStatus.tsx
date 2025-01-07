import { TaskResponse, taskStatusOptions } from "@/@types/task/task";
import { Tag } from "primereact/tag";

interface TaskListStatusProps {
    task: TaskResponse;
}

export default function TaskListStatus({ task }: TaskListStatusProps) {
    const getSeverity = () => {
        switch (task.status) {
            case 1:
                return 'secondary';
            case 2:
                return 'success';
            case 3:
                return 'danger';
            default:
                return 'info';
        }
    };

    const getTaskLabel = () => {
        return taskStatusOptions?.find(x => x.value == task.status)?.label;
    };

    return (<div className="w-full flex items-center justify-center"><Tag value={getTaskLabel()} severity={getSeverity()}></Tag></div>);
}