using FluentValidation;
using TodoList.Application.Common.Constants;

namespace TodoList.Application.UseCases.Users.SignInUser;

public class SignInUserValidator : AbstractValidator<SignInUserRequest>
{
    public SignInUserValidator()
    {
        RuleFor(x => x.Email).NotEmpty().WithMessage(UserConstantExceptions.EmailRequired)
            .EmailAddress().WithMessage(UserConstantExceptions.EmailFormat);

        RuleFor(x => x.Password).NotEmpty().WithMessage(UserConstantExceptions.PasswordRequired)
            .MinimumLength(6).WithMessage(UserConstantExceptions.PasswordMinimumLength);
    }
}
