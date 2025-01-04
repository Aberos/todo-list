using MediatR;

namespace TodoList.Application.UseCases.Users.RecoverUserPassword;

public record RecoverUserPasswordRequest(string Email) : IRequest
{
}
