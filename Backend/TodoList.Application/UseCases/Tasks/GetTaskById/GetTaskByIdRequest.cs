using MediatR;
using Task = TodoList.Domain.Entities.Task;

namespace TodoList.Application.UseCases.Tasks.GetTaskById;

public record GetTaskByIdRequest(string Id) : IRequest<Task>
{
}
