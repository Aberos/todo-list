using FluentValidation;
using TodoList.Application.Common.Constants;

namespace TodoList.Application.UseCases.Tasks.GetFilteredTaskList;

public class GetFilteredTaskListValidator : AbstractValidator<GetFilteredTaskListRequest>
{
    public GetFilteredTaskListValidator()
    {
        RuleFor(x=> x.Page).GreaterThanOrEqualTo(1).WithMessage(ConstantExceptions.PageGreaterThan);
        RuleFor(x => x.PageSize).GreaterThanOrEqualTo(1).WithMessage(ConstantExceptions.PageGreaterThan);
    }
}
