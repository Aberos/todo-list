using FluentValidation;
using MediatR;
using TodoList.Domain.Abstractions;
using TodoList.Domain.Entities;
using TodoList.Domain.Helpers;
using TodoList.Domain.Repositories;
using Task = System.Threading.Tasks.Task;


namespace TodoList.Application.UseCases.Users.SignUpUser;

public class SignUpUserHandler : IRequestHandler<SignUpUserRequest>
{
    private readonly IUserRepository _userRepository;
    private readonly IValidator<SignUpUserRequest> _validatorSignUpUser;
    private readonly IUnitOfWork _unitOfWork;
    public SignUpUserHandler(IUserRepository userRepository, IValidator<SignUpUserRequest> validatorSignUpUser, IUnitOfWork unitOfWork)
    {
        _userRepository = userRepository;
        _validatorSignUpUser = validatorSignUpUser;
        _unitOfWork = unitOfWork;
    }

    public async Task Handle(SignUpUserRequest request, CancellationToken cancellationToken)
    {
        var validatorSignUpUserResult = await _validatorSignUpUser.ValidateAsync(request, cancellationToken);
        if (!validatorSignUpUserResult.IsValid)
            throw new ValidationException(validatorSignUpUserResult.Errors);

        var signUpUser = new User
        {
            Email = request.Email,
            Name = request.Name,
            Password = UserHelper.EncryptPassword(request.Password)
        };

        _userRepository.Create(signUpUser);
        await _unitOfWork.CommitAsync(cancellationToken);
    }
}
