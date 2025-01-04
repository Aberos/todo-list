using FluentValidation;
using FluentValidation.Results;
using TodoList.Application.Common.Constants;
using TodoList.Domain.Repositories;

namespace TodoList.Application.UseCases.Users.SignUpUser;

public class SignUpUserValidator: AbstractValidator<SignUpUserRequest>
{
    public SignUpUserValidator(IUserRepository userRepository)
    {
        RuleFor(x => x.Name).NotEmpty().WithMessage(UserConstantExceptions.NameRequired);

        RuleFor(x => x.Password).NotEmpty().WithMessage(UserConstantExceptions.PasswordRequired)
            .MinimumLength(6).WithMessage(UserConstantExceptions.PasswordMinimumLength);

        RuleFor(x => x.Email).NotEmpty().WithMessage(UserConstantExceptions.EmailRequired)
            .EmailAddress().WithMessage(UserConstantExceptions.EmailFormat)
            .CustomAsync(async (email, context, cancellationToken) =>
            {
                if (!string.IsNullOrWhiteSpace(email))
                {
                    var userEmail = await userRepository.GetByEmail(email, cancellationToken);
                    if (userEmail is not null)
                        context.AddFailure(new ValidationFailure("Email", UserConstantExceptions.EmailAlreadyRegistered));
                }
            });
    }
}
