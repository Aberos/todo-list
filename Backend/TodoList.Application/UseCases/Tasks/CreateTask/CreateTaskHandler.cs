using FluentValidation;
using MediatR;
using TodoList.Domain.Abstractions;
using TodoList.Domain.Repositories;

namespace TodoList.Application.UseCases.Tasks.CreateTask;

public class CreateTaskHandler : IRequestHandler<CreateTaskRequest>
{
    private readonly ITaskRepository _taskRepository;
    private readonly IValidator<CreateTaskRequest> _validatorCreateTask;
    private readonly IUnitOfWork _unitOfWork;

    public CreateTaskHandler(ITaskRepository taskRepository, IValidator<CreateTaskRequest> validatorCreateTask, IUnitOfWork unitOfWork)
    {
        _taskRepository = taskRepository;
        _validatorCreateTask = validatorCreateTask;
        _unitOfWork = unitOfWork;
    }

    public async Task Handle(CreateTaskRequest request, CancellationToken cancellationToken)
    {
        var validatorCreateTaskResult = _validatorCreateTask.Validate(request);
        if (!validatorCreateTaskResult.IsValid)
            throw new ValidationException(validatorCreateTaskResult.Errors);

        var newTask = new Domain.Entities.Task
        {
            Title = request.Title!,
            Description = request.Description,
            Status = request.Status ?? Domain.Enums.TaskStatus.Pending
        };

        _taskRepository.Create(newTask);
        await _unitOfWork.CommitAsync(cancellationToken);
    }
}
