using FluentValidation;
using TodoList.Application.Common.Constants;

namespace TodoList.Application.UseCases.Tasks.UpdateTask;

public class UpdateTaskValidator : AbstractValidator<UpdateTaskRequest>
{
    public UpdateTaskValidator()
    {
        RuleFor(x=> x.Id).NotEmpty().WithMessage(TaskConstantExceptions.IdRequired);
        RuleFor(x => x.Title).NotEmpty().WithMessage(TaskConstantExceptions.TitleRequired);
    }
}
