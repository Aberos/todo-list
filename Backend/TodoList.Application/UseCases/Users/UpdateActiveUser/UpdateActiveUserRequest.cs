using MediatR;

namespace TodoList.Application.UseCases.Users.UpdateActiveUser;

public record UpdateActiveUserRequest(string Name): IRequest
{
}
