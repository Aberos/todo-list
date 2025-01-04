using FluentValidation;
using TodoList.Application.Common.Constants;

namespace TodoList.Application.UseCases.Users.RecoverUserPassword;

public class RecoverUserPasswordValidator : AbstractValidator<RecoverUserPasswordRequest>
{
    public RecoverUserPasswordValidator()
    {
        RuleFor(x => x.Email).NotEmpty().WithMessage(UserConstantExceptions.EmailRequired)
           .EmailAddress().WithMessage(UserConstantExceptions.EmailFormat);
    }
}
