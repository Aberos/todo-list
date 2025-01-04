using FluentValidation;
using MediatR;
using TodoList.Application.Common.EmailTemplates;
using TodoList.Domain.Abstractions;
using TodoList.Domain.Helpers;
using TodoList.Domain.Repositories;

namespace TodoList.Application.UseCases.Users.RecoverUserPassword;

public class RecoverUserPasswordHandler : IRequestHandler<RecoverUserPasswordRequest>
{
    private readonly IUserRepository _userRepository;
    private readonly IValidator<RecoverUserPasswordRequest> _validatorRecoverUserPassword;
    private readonly IEmailService _emailService;
    private readonly IUnitOfWork _unitOfWork;

    public RecoverUserPasswordHandler(IUserRepository userRepository, IValidator<RecoverUserPasswordRequest> validatorRecoverUserPassword, IEmailService emailService, IUnitOfWork unitOfWork)
    {
        _userRepository = userRepository;
        _validatorRecoverUserPassword = validatorRecoverUserPassword;
        _emailService = emailService;
        _unitOfWork = unitOfWork;
    }

    public async Task Handle(RecoverUserPasswordRequest request, CancellationToken cancellationToken)
    {
        var validatorRecoverUserPasswordResult = _validatorRecoverUserPassword.Validate(request);
        if (!validatorRecoverUserPasswordResult.IsValid)
            throw new ValidationException(validatorRecoverUserPasswordResult.Errors);

        var userRecoveryPassword = await _userRepository.GetByEmail(request.Email, cancellationToken);
        if(userRecoveryPassword is not null)
        {
            var newPassword = UserHelper.GenerateRandomPassword();
            var newPasswordEncrypted = UserHelper.EncryptPassword(newPassword);
            userRecoveryPassword.Password = newPasswordEncrypted;
            _userRepository.Update(userRecoveryPassword);
            await _unitOfWork.CommitAsync(cancellationToken);

            var bodyRecoveryPasswordEmail = RecoveryPasswordTemplate.GetTemplate(newPassword);
            await _emailService.Send(userRecoveryPassword.Email, bodyRecoveryPasswordEmail);
        }
    }
}
