using MediatR;
using TodoList.Domain.Dtos;
using Task = TodoList.Domain.Entities.Task;
using TaskStatus = TodoList.Domain.Enums.TaskStatus;

namespace TodoList.Application.UseCases.Tasks.GetFilteredTaskList;

public record GetFilteredTaskListRequest : TaskFiltersRequest, IRequest<FilterResponse<Task>>
{
    public GetFilteredTaskListRequest(int Page, int PageSize, string Search, List<TaskStatus> Status) : base(Page, PageSize, Search, Status)
    {
    }
}
