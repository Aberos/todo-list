using Microsoft.AspNetCore.Http;
using System.Security.Claims;
using TodoList.Domain.Abstractions;

namespace TodoList.Persistence;

public class ActiveUser : IActiveUser
{
    private readonly IHttpContextAccessor _httpContextAccessor;
    public ActiveUser(IHttpContextAccessor httpContextAccessor)
    {
        _httpContextAccessor = httpContextAccessor;
    }

    public string Id => _httpContextAccessor.HttpContext?.User?.Claims
        .FirstOrDefault(c => c.Type == ClaimTypes.Sid)?.Value!;

    public string Name => _httpContextAccessor.HttpContext?.User?.Claims
        .FirstOrDefault(c => c.Type == ClaimTypes.Name)?.Value!;

    public string Email => _httpContextAccessor.HttpContext?.User?.Claims
        .FirstOrDefault(c => c.Type == ClaimTypes.Email)?.Value!;
}
