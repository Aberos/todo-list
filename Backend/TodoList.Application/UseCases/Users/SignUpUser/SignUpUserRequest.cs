using MediatR;

namespace TodoList.Application.UseCases.Users.SignUpUser;

public record SignUpUserRequest(string Email, string Name, string Password) : IRequest
{
}
