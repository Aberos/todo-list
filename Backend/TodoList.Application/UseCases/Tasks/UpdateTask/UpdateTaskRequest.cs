using MediatR;
using TaskStatus = TodoList.Domain.Enums.TaskStatus;

namespace TodoList.Application.UseCases.Tasks.UpdateTask;

public class UpdateTaskRequest : IRequest
{
    public string? Id { get; set; }

    public string? Title { get; set; }

    public string? Description { get; set; }

    public TaskStatus? Status { get; set; }
}
