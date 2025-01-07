import { formatDate, parseValidationErrorArray } from "@/utils/utils";
import TaskForm from "@/components/forms/task/taskForm";
import { useThemeContext } from "@/context/theme-context";
import { deleteTask, getFilteredListTask } from "@/services/task-service";
import { TaskFilterRequest, TaskFilterResponse, TaskResponse } from "@/@types/task/task";
import { SortOrder } from "primereact/api";
import { Card } from "primereact/card";
import { Column } from "primereact/column";
import { DataTable, DataTableStateEvent } from "primereact/datatable";
import { Dialog } from "primereact/dialog";
import { useEffect, useState } from "react";
import TaskListHeader from "./header/taskListHeader";
import TaskListStatus from "./status/taskListStatus";
import TaskListOptions from "./options/taskListOptions";

export default function TaskList() {
    const { showError, showSuccess } = useThemeContext();
    const [showModalCreateTask, setShowModalCreateTask] = useState<boolean>(false);
    const [selectedId, setSelectedId] = useState<string>(null!);
    const [taskFilter, setTaskFilter] = useState<TaskFilterResponse>(null!);
    const [loadingTask, setLoadingTask] = useState<boolean>(false);

    const initialFilter: TaskFilterRequest = {
        search: '',
        status: [],
        page: 1,
        pageSize: 10
    };
    const [filter, setFilter] = useState<TaskFilterRequest>(initialFilter);

    const initialParams: DataTableStateEvent = {
        first: 0,
        rows: initialFilter.pageSize,
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
            filterTask(initialFilter);
        }
    };

    async function filterTask(value: TaskFilterRequest) {
        try {
            setLoadingTask(true);
            setFilter(value);
            const response = await getFilteredListTask(value);
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

    async function handleDeleteTask(task: TaskResponse) {
        try {
            setLoadingTask(true);
            await deleteTask(task.id);
            showSuccess(`Tarefa ${task.title} foi removida!`);
            filterTask(filter);
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
        filterTask({
            page: page,
            pageSize: filter.pageSize,
            search: filter.search,
            status: filter.status
        });
    };

    const handleFilter = (event: TaskFilterRequest) => {
        filterTask(event);
    };

    const handleEditTask = (task: TaskResponse) => {
        setSelectedId(task.id);
        setShowModalCreateTask(true);
    };

    useEffect(() => {
        filterTask(initialFilter);
    }, []);

    const headerCard = () => {
        return (
            <TaskListHeader onAdd={() => setShowModalCreateTask(true)}
                filter={filter}
                onFilter={handleFilter} />
        );
    };

    const statusBodyTemplate = (task: TaskResponse) => {
        return <TaskListStatus task={task} />;
    };

    const createdDateBodyTemplate = (task: TaskResponse) => {
        return formatDate(task.createdDate);
    };

    const optionsBodyTemplate = (task: TaskResponse) => {
        return <TaskListOptions task={task} onEdit={handleEditTask} onDelete={handleDeleteTask} />;
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
                    <Column field="title" header="Titulo" style={{ width: '40%' }}></Column>
                    <Column field="createdDate" header="Data" body={createdDateBodyTemplate} style={{ width: '20%' }}></Column>
                    <Column field="status" header="Status" alignHeader={"center"} body={statusBodyTemplate} style={{ width: '20%' }}></Column>
                    <Column field="id" header="Opções" alignHeader={"center"} body={optionsBodyTemplate} style={{ width: '20%' }}></Column>
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
