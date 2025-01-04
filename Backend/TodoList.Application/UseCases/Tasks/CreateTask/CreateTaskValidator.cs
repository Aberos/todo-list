using FluentValidation;
using TodoList.Application.Common.Constants;

namespace TodoList.Application.UseCases.Tasks.CreateTask;

public class CreateTaskValidator : AbstractValidator<CreateTaskRequest>
{
    public CreateTaskValidator()
    {
        RuleFor(x=> x.Title).NotEmpty().WithMessage(TaskConstantExceptions.TitleRequired);
    }
}
