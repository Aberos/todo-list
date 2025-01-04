using MediatR;

namespace TodoList.Application.UseCases.Tasks.DeleteTask;

public record DeleteTaskRequest(string Id) : IRequest
{
}
