using FluentValidation;
using MediatR;
using TodoList.Application.Common.Constants;
using TodoList.Domain.Abstractions;
using TodoList.Domain.Repositories;

namespace TodoList.Application.UseCases.Tasks.UpdateTask;

public class UpdateTaskHandler : IRequestHandler<UpdateTaskRequest>
{
    private readonly ITaskRepository _taskRepository;
    private readonly IValidator<UpdateTaskRequest> _validatorUpdateTask;
    private readonly IUnitOfWork _unitOfWork;
    public UpdateTaskHandler(ITaskRepository taskRepository, IValidator<UpdateTaskRequest> validatorUpdateTask, IUnitOfWork unitOfWork)
    {
        _taskRepository = taskRepository;
        _validatorUpdateTask = validatorUpdateTask;
        _unitOfWork = unitOfWork;
    }

    public async Task Handle(UpdateTaskRequest request, CancellationToken cancellationToken)
    {
        var validatorUpdateTaskResult = _validatorUpdateTask.Validate(request);
        if (!validatorUpdateTaskResult.IsValid)
            throw new ValidationException(validatorUpdateTaskResult.Errors);

        var task = await _taskRepository.GetById(request.Id, cancellationToken) ??
            throw new ValidationException(TaskConstantExceptions.NotFound);

        task.Title = request.Title;
        task.Description = request.Description;
        _taskRepository.Update(task);
        await _unitOfWork.CommitAsync(cancellationToken);
    }
}
