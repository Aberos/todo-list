using FluentValidation;
using TodoList.Application.Common.Constants;

namespace TodoList.Application.UseCases.Users.UpdateActiveUserPassword;

public class UpdateActiveUserPasswordValidator : AbstractValidator<UpdateActiveUserPasswordRequest>
{
    public UpdateActiveUserPasswordValidator()
    {
        RuleFor(x => x.Password).NotEmpty().WithMessage(UserConstantExceptions.PasswordRequired)
            .MinimumLength(6).WithMessage(UserConstantExceptions.PasswordMinimumLength);

        RuleFor(x => x.NewPassword).NotEmpty().WithMessage(UserConstantExceptions.NewPasswordRequired)
            .MinimumLength(6).WithMessage(UserConstantExceptions.NewPasswordMinimumLength);
    }
}
