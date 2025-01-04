using FluentValidation;
using MediatR;
using TodoList.Application.Common.Constants;
using TodoList.Domain.Abstractions;
using TodoList.Domain.Dtos;
using TodoList.Domain.Helpers;
using TodoList.Domain.Repositories;

namespace TodoList.Application.UseCases.Users.SignInUser;

public class SignInUserHandler : IRequestHandler<SignInUserRequest, SignInUserResponse>
{
    private readonly IUserRepository _userRepository;
    private readonly IValidator<SignInUserRequest> _validatorSignInUser;
    private readonly ITokenService _tokenService;

    public SignInUserHandler(IUserRepository userRepository, IValidator<SignInUserRequest> validatorSignInUser, ITokenService tokenService)
    {
        _userRepository = userRepository;
        _validatorSignInUser = validatorSignInUser;
        _tokenService = tokenService;
    }

    public async Task<SignInUserResponse> Handle(SignInUserRequest request, CancellationToken cancellationToken)
    {
        var user = await _userRepository.GetByEmail(request.Email, cancellationToken)
            ?? throw new ValidationException(UserConstantExceptions.EmailPasswordInvalid);

        var encryptedRequestPassword = UserHelper.EncryptPassword(request.Password);
        if (user.Password != encryptedRequestPassword)
            throw new ValidationException(UserConstantExceptions.EmailPasswordInvalid);

        var token = await _tokenService.GenerateUserToken(user);

        return new SignInUserResponse(token, user.Name, user.Email);
    }
}
