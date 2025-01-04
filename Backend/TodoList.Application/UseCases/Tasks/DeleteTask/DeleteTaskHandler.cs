using FluentValidation;
using MediatR;
using TodoList.Application.Common.Constants;
using TodoList.Domain.Abstractions;
using TodoList.Domain.Repositories;

namespace TodoList.Application.UseCases.Tasks.DeleteTask;

public class DeleteTaskHandler : IRequestHandler<DeleteTaskRequest>
{
    private readonly ITaskRepository _taskRepository;
    private readonly IValidator<DeleteTaskRequest> _validatorDeleteTask;
    private readonly IUnitOfWork _unitOfWork;
    public DeleteTaskHandler(ITaskRepository taskRepository, IUnitOfWork unitOfWork, IValidator<DeleteTaskRequest> validatorDeleteTask)
    {
        _taskRepository = taskRepository;
        _unitOfWork = unitOfWork;
        _validatorDeleteTask = validatorDeleteTask;
    }

    public async Task Handle(DeleteTaskRequest request, CancellationToken cancellationToken)
    {
        var validatorDeleteTaskResult = _validatorDeleteTask.Validate(request);
        if (!validatorDeleteTaskResult.IsValid)
            throw new ValidationException(validatorDeleteTaskResult.Errors);

        var task = await _taskRepository.GetById(request.Id, cancellationToken) ?? 
            throw new ValidationException(TaskConstantExceptions.NotFound);

        _taskRepository.Delete(task);
        await _unitOfWork.CommitAsync(cancellationToken);
    }
}
