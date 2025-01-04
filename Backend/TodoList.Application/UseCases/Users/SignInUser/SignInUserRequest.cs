using MediatR;
using TodoList.Domain.Dtos;

namespace TodoList.Application.UseCases.Users.SignInUser;

public record SignInUserRequest(string Email, string Password) : IRequest<SignInUserResponse>
{
}
