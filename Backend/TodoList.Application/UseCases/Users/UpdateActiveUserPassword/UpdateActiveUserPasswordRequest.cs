using MediatR;

namespace TodoList.Application.UseCases.Users.UpdateActiveUserPassword;

public record UpdateActiveUserPasswordRequest(string Password, string NewPassword) : IRequest
{
}
