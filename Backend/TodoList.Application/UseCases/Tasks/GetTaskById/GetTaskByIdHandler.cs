using FluentValidation;
using MediatR;
using TodoList.Application.Common.Constants;
using TodoList.Domain.Repositories;

namespace TodoList.Application.UseCases.Tasks.GetTaskById;

public class GetTaskByIdHandler : IRequestHandler<GetTaskByIdRequest, Domain.Entities.Task>
{
    private readonly ITaskRepository _taskRepository;
    private readonly IValidator<GetTaskByIdRequest> _validatorGetTaskById;
    public GetTaskByIdHandler(ITaskRepository taskRepository, IValidator<GetTaskByIdRequest> validatorGetTaskById)
    {
        _taskRepository = taskRepository;
        _validatorGetTaskById = validatorGetTaskById;
    }

    public async Task<Domain.Entities.Task> Handle(GetTaskByIdRequest request, CancellationToken cancellationToken)
    {
        var validatorGetTaskByIdResult = _validatorGetTaskById.Validate(request);
        if(!validatorGetTaskByIdResult.IsValid)
            throw new ValidationException(validatorGetTaskByIdResult.Errors);

        var task = await _taskRepository.GetById(request.Id, cancellationToken) ??
            throw new ValidationException(TaskConstantExceptions.NotFound);

        return task;
    }
}
