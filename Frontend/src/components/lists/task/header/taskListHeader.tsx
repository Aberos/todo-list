import { TaskFilterRequest, taskStatusOptions } from "@/@types/task/task";
import { TaskStatus } from "@/enums/task-status";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { MultiSelect } from "primereact/multiselect";
import { useEffect, useState } from "react";


interface TaskListHeaderProps {
    onFilter: (status: TaskFilterRequest) => void;
    onAdd: () => void;
    filter: TaskFilterRequest;
}

export default function TaskListHeader({ onFilter, filter, onAdd }: TaskListHeaderProps) {
    const [status, setStatus] = useState<TaskStatus[]>([]);
    const [search, setSearch] = useState<string>('');

    const handleFilter = () => {
        onFilter({
            page: filter.page,
            pageSize: filter.pageSize,
            search: search,
            status: status
        });
    };

    useEffect(() => {
        setSearch(filter?.search);
        setStatus(filter?.status);
    }, [filter]);

    return (<div className="w-full flex flex-wrap items-center p-4 justify-center md:justify-between">
        <h2 className="">Tarefas</h2>
        <div className="flex flex-wrap items-center justify-center md:justify-end">
            <MultiSelect value={status} onChange={(e) => setStatus(e.value)} onHide={handleFilter} options={taskStatusOptions} optionLabel="label"
                placeholder="Selecione os status" className="w-full md:flex-1 mb-1" />

            <div className="p-inputgroup flex-1 md:ml-1  mb-1">
                <InputText placeholder="Buscar" value={search} onChange={(e => setSearch(e.target?.value))} />
                <Button onClick={handleFilter} icon="pi pi-search" className="p-button-primary" />
            </div>
            <Button
                className="ml-1 md:ml-2 mb-1"
                icon="pi pi-plus"
                label="Adicionar"
                onClick={onAdd}
            />
        </div>
    </div>);
}