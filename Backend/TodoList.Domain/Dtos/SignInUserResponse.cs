namespace TodoList.Domain.Dtos;

public record SignInUserResponse(string Token, string Name, string Email)
{
}
