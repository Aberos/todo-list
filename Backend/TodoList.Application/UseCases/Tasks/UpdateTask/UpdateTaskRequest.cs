using MediatR;

namespace TodoList.Application.UseCases.Tasks.UpdateTask;

public class UpdateTaskRequest: IRequest
{
    public required string Id { get; set; }

    public required string Title { get; set; }

    public required string Description { get; set; }
}
