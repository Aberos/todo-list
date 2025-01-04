using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using TodoList.Domain.Abstractions;
using TodoList.Domain.Entities;
using TodoList.Domain.Repositories;
using TodoList.Domain.Settings;
using Task = System.Threading.Tasks.Task;

namespace TodoList.Persistence.Services;

public class TokenService : ITokenService
{
    private readonly TokenSettings _settings;
    private readonly IUserRepository _userRepository;

    public TokenService(TokenSettings settings, IUserRepository userRepository)
    {
        _settings = settings;
        _userRepository = userRepository;
    }

    public Task<string> GenerateUserToken(User user)
    {
        var tokenHandler = new JwtSecurityTokenHandler();
        var key = Encoding.ASCII.GetBytes(_settings.SecretKey);
        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(
            [
                    new Claim(ClaimTypes.Name, user.Name),
                    new Claim(ClaimTypes.Email, user.Email),
                    new Claim(ClaimTypes.Sid, user.Id!)
            ]),
            Expires = DateTime.UtcNow.AddHours(_settings.ExpirationTimeInHours),
            SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
        };
        var token = tokenHandler.CreateToken(tokenDescriptor);
        return Task.FromResult(tokenHandler.WriteToken(token));
    }
}
