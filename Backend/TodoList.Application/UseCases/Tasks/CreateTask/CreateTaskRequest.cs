using MediatR;
using TaskStatus = TodoList.Domain.Enums.TaskStatus;

namespace TodoList.Application.UseCases.Tasks.CreateTask;

public record CreateTaskRequest(string? Title, string? Description, TaskStatus? Status) : IRequest
{
}
