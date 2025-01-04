using MediatR;

namespace TodoList.Application.UseCases.Tasks.CreateTask;

public record CreateTaskRequest(string Title, string Description) : IRequest
{
}
