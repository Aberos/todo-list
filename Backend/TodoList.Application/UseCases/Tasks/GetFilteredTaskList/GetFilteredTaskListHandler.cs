using FluentValidation;
using MediatR;
using TodoList.Domain.Dtos;
using TodoList.Domain.Repositories;

namespace TodoList.Application.UseCases.Tasks.GetFilteredTaskList;

public class GetFilteredTaskListHandler : IRequestHandler<GetFilteredTaskListRequest, FilterResponse<Domain.Entities.Task>>
{
    private readonly ITaskRepository _taskRepository;
    private readonly IValidator<GetFilteredTaskListRequest> _validatorGetFilteredTaskList;

    public GetFilteredTaskListHandler(ITaskRepository taskRepository, IValidator<GetFilteredTaskListRequest> validatorGetFilteredTaskList)
    {
        _taskRepository = taskRepository;
        _validatorGetFilteredTaskList = validatorGetFilteredTaskList;
    }

    public Task<FilterResponse<Domain.Entities.Task>> Handle(GetFilteredTaskListRequest request, CancellationToken cancellationToken)
    {
        var validatorGetFilteredTaskListResult = _validatorGetFilteredTaskList.Validate(request);
        if (!validatorGetFilteredTaskListResult.IsValid)
            throw new ValidationException(validatorGetFilteredTaskListResult.Errors);

        return _taskRepository.GetFilteredList(request, cancellationToken);
    }
}
