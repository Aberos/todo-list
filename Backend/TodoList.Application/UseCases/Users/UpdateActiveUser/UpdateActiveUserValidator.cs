using FluentValidation;
using TodoList.Application.Common.Constants;

namespace TodoList.Application.UseCases.Users.UpdateActiveUser;

public class UpdateActiveUserValidator : AbstractValidator<UpdateActiveUserRequest>
{
    public UpdateActiveUserValidator()
    {
        RuleFor(x=> x.Name).NotEmpty().WithMessage(UserConstantExceptions.NameRequired);
    }
}
