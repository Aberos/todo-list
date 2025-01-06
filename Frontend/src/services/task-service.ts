import { TaskFilterRequest, TaskFilterResponse, TaskRequest, TaskResponse } from "@/types/task/task";
import api, { getHeaderToken } from "./api";

export const createTask = async (taskRequest: TaskRequest) => {
    return api.post("/task", taskRequest, getHeaderToken());;
}

export const updateTask = async (id: string, taskRequest: TaskRequest) => {
    return api.put("/task/" + id, taskRequest, getHeaderToken());;
}

export const deleteTask = async (id: string) => {
    return api.delete("/task/" + id, getHeaderToken());;
}

export const getTask = async (id: string) => {
    return api.get<TaskResponse>("/task/" + id, getHeaderToken());
}

export const getFilteredListTask = async (filter: TaskFilterRequest) => {
    let url = "/task";

    const queryParams: string[] = [];
    queryParams.push("page=" + (filter?.page ?? 1));
    queryParams.push("pageSize=" + (filter?.pageSize ?? 10));

    if (filter?.search) {
        queryParams.push("search=" + filter.search);
    }

    if (filter?.status?.length > 0) {
        filter.status.map((s) => {
            queryParams.push("status=" + s);
        });
    }

    url += "?" + queryParams.join("&");

    return api.get<TaskFilterResponse>(url, getHeaderToken());
}
