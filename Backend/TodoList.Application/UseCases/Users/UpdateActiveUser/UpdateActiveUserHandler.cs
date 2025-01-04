using FluentValidation;
using MediatR;
using TodoList.Application.Common.Constants;
using TodoList.Domain.Abstractions;
using TodoList.Domain.Repositories;

namespace TodoList.Application.UseCases.Users.UpdateActiveUser;

public class UpdateActiveUserHandler : IRequestHandler<UpdateActiveUserRequest>
{
    private readonly IUserRepository _userRepository;
    private readonly IValidator<UpdateActiveUserRequest> _validatorUpdateActiveUser;
    private readonly IActiveUser _activeUser;
    private readonly IUnitOfWork _unitOfWork;

    public UpdateActiveUserHandler(IUserRepository userRepository, IValidator<UpdateActiveUserRequest> validatorUpdateActiveUser,
        IActiveUser activeUser, IUnitOfWork unitOfWork)
    {
        _userRepository = userRepository;
        _validatorUpdateActiveUser = validatorUpdateActiveUser;
        _activeUser = activeUser;
        _unitOfWork = unitOfWork;
    }

    public async Task Handle(UpdateActiveUserRequest request, CancellationToken cancellationToken)
    {
        var validatorUpdateActiveUserResult = _validatorUpdateActiveUser.Validate(request);
        if (!validatorUpdateActiveUserResult.IsValid)
            throw new ValidationException(validatorUpdateActiveUserResult.Errors);

        var activeUser = await _userRepository.GetById(_activeUser.Id, cancellationToken)
            ?? throw new ValidationException(UserConstantExceptions.UserInvalid);

        activeUser.Name = _activeUser.Name;
        _userRepository.Update(activeUser);
        await _unitOfWork.CommitAsync(cancellationToken);
    }
}
