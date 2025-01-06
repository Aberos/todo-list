import { parseValidationErrorArray } from "@/common/utils";
import TaskForm from "@/components/forms/task/taskForm";
import { useThemeContext } from "@/context/theme-context";
import { TaskStatus } from "@/enums/task-status";
import { getFilteredListTask } from "@/services/task-service";
import { TaskFilterRequest, TaskFilterResponse, TaskResponse, taskStatusOptions } from "@/types/task/task";
import { SortOrder } from "primereact/api";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Column } from "primereact/column";
import { DataTable, DataTableStateEvent } from "primereact/datatable";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { MultiSelect } from "primereact/multiselect";
import { useEffect, useState } from "react";

export default function TaskList() {
    const { showError } = useThemeContext();
    const [pageSize] = useState<number>(10);
    const [search, setSearch] = useState<string>(null!);
    const [page, setPage] = useState<number>(1);
    const [status, setStatus] = useState<TaskStatus[]>([]);
    const [showModalCreateTask, setShowModalCreateTask] = useState<boolean>(false);
    const [selectedId, setSelectedId] = useState<string>(null!);
    const [taskFilter, setTaskFilter] = useState<TaskFilterResponse>(null!);
    const [loadingTask, setLoadingTask] = useState<boolean>(false);
    const initialParams: DataTableStateEvent = {
        first: 0,
        rows: pageSize,
        page: 1,
        sortField: '',
        sortOrder: SortOrder.UNSORTED,
        multiSortMeta: [],
        filters: {}
    };

    const [tableParams, setTableParams] = useState<DataTableStateEvent>(initialParams);

    const handleCloseModalTask = (update: boolean) => {
        if (!showModalCreateTask)
            return;

        setShowModalCreateTask(false);

        if (update) {
            getTasks();
        }
    };

    const getTasks = async () => {
        try {
            setLoadingTask(true);
            const filter: TaskFilterRequest = {
                search: search,
                status: status,
                page: page,
                pageSize: pageSize
            };

            const response = await getFilteredListTask(filter);

            if (response.data) {
                setTaskFilter(response.data);
            } else {
                setTaskFilter(null!);
            }
        } catch (error: any) {
            if (parseValidationErrorArray(error?.response?.data)) {
                for (const validationError of parseValidationErrorArray(error.response.data)) {
                    showError(validationError.errorMessage);
                }
            } else {
                showError(error?.message);
            }
        } finally {
            setLoadingTask(false);
        }
    };

    const handlePage = (event: DataTableStateEvent) => {
        setTableParams(event);
        const page = (event.page ?? 0) + 1;
        setPage(page);
    };

    const handleSearch = () => {
        getTasks();
    }

    const handleStatus = () => {
        getTasks();
    }

    useEffect(() => {
        getTasks();
    }, []);

    const headerCard = () => {
        return (
            <div className="w-full flex flex-wrap items-center p-4 justify-center md:justify-between">
                <h2>Tarefas</h2>
                <div className="flex flex-wrap items-center justify-center md:justify-end">
                    <MultiSelect value={status} onChange={(e) => setStatus(e.value)} onHide={handleStatus} options={taskStatusOptions} optionLabel="label"
                        placeholder="Selecione os status" className="w-full md:flex-1" />

                    <div className="p-inputgroup flex-1 md:ml-1">
                        <InputText placeholder="Buscar" value={search} onChange={(e => setSearch(e.target.value))} onBlur={handleSearch} />
                        <Button icon="pi pi-search" className="p-button-primary" />
                    </div>
                    <Button
                        className="md:ml-2"
                        icon="pi pi-plus"
                        label="Adicionar"
                        onClick={() => setShowModalCreateTask(true)}
                    />
                </div>
            </div>
        );
    };

    return (<div className="w-full">
        <Card header={headerCard}>
            {taskFilter ?
                <DataTable
                    lazy
                    value={taskFilter.data}
                    paginator
                    totalRecords={taskFilter.totalCount}
                    tableStyle={{ minWidth: '50rem' }}
                    first={tableParams.first}
                    rows={tableParams.rows}
                    onPage={handlePage}
                    loading={loadingTask}
                >
                    <Column field="title" header="Titulo"></Column>
                    <Column field="status" header="Status"></Column>
                    <Column field="createdDate" header="Data"></Column>
                    <Column field="id" header="Opções"></Column>
                </DataTable>
                : <></>}
        </Card>
        <Dialog
            header="Tarefa"
            visible={showModalCreateTask}
            style={{ width: "50vw" }}
            breakpoints={{ '960px': '75vw', '641px': '90vw' }}
            onHide={() => handleCloseModalTask(false)}
        >
            <TaskForm onClose={handleCloseModalTask} taskId={selectedId} />
        </Dialog>
    </div>
    )
}
