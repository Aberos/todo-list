using FluentValidation;
using MediatR;
using TodoList.Application.Common.Constants;
using TodoList.Domain.Abstractions;
using TodoList.Domain.Helpers;
using TodoList.Domain.Repositories;
using Task = System.Threading.Tasks.Task;

namespace TodoList.Application.UseCases.Users.UpdateActiveUserPassword;

public class UpdateActiveUserPasswordHandler : IRequestHandler<UpdateActiveUserPasswordRequest>
{
    private readonly IUserRepository _userRepository;
    private readonly IValidator<UpdateActiveUserPasswordRequest> _validatorUpdateActiveUserPassword;
    private readonly IActiveUser _activeUser;
    private readonly IUnitOfWork _unitOfWork;

    public UpdateActiveUserPasswordHandler(IUserRepository userRepository, IValidator<UpdateActiveUserPasswordRequest> validatorUpdateActiveUserPassword, IActiveUser activeUser, IUnitOfWork unitOfWork)
    {
        _userRepository = userRepository;
        _validatorUpdateActiveUserPassword = validatorUpdateActiveUserPassword;
        _activeUser = activeUser;
        _unitOfWork = unitOfWork;
    }

    public async Task Handle(UpdateActiveUserPasswordRequest request, CancellationToken cancellationToken)
    {
        var validatorUpdateActiveUserPasswordResult = _validatorUpdateActiveUserPassword.Validate(request);
        if (!validatorUpdateActiveUserPasswordResult.IsValid)
            throw new ValidationException(validatorUpdateActiveUserPasswordResult.Errors);

        var activeUser = await _userRepository.GetById(_activeUser.Id, cancellationToken)
            ?? throw new ValidationException(UserConstantExceptions.PasswordInvalid);

        var encryptedRequestPassword = UserHelper.EncryptPassword(request.NewPassword);
        if (activeUser.Password != encryptedRequestPassword)
            throw new ValidationException(UserConstantExceptions.PasswordInvalid);

        activeUser.Password = encryptedRequestPassword;
        _userRepository.Update(activeUser);
        await _unitOfWork.CommitAsync(cancellationToken);
    }
}
