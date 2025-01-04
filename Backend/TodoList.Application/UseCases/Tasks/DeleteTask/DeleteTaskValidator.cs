using FluentValidation;
using TodoList.Application.Common.Constants;

namespace TodoList.Application.UseCases.Tasks.DeleteTask;

public class DeleteTaskValidator: AbstractValidator<DeleteTaskRequest>
{
    public DeleteTaskValidator()
    {
        RuleFor(x => x.Id).NotEmpty().WithMessage(TaskConstantExceptions.IdRequired);
    }
}
