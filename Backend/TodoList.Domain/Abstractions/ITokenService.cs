using TodoList.Domain.Entities;

namespace TodoList.Domain.Abstractions;

public interface ITokenService
{
    Task<string> GenerateUserToken(User user);

    Task<User> GetUserByToken(string token);
}
