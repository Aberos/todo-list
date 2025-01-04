namespace TodoList.Domain.Dtos;

public record UserSignInResponse(string Token, string Name, string Email)
{
}
