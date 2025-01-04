using FluentValidation;
using TodoList.Application.Common.Constants;

namespace TodoList.Application.UseCases.Tasks.GetTaskById;

public class GetTaskByIdValidator : AbstractValidator<GetTaskByIdRequest>
{
    public GetTaskByIdValidator()
    {
        RuleFor(x=> x.Id).NotEmpty().WithMessage(TaskConstantExceptions.IdRequired);
    }
}
