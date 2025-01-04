using Microsoft.EntityFrameworkCore;
using TodoList.Domain.Entities;
using TodoList.Domain.Repositories;
using TodoList.Persistence.Contexts;

namespace TodoList.Persistence.Repositories;

public class UserRepository : IUserRepository
{
    private readonly TodoContext _context;
    public UserRepository(TodoContext context)
    {
        _context = context;
    }

    public void Create(User entity)
    {
        _context.Users.Add(entity);
    }

    public void Delete(User entity)
    {
        _context.Users.Remove(entity);
    }

    public Task<User> GetByEmail(string email, CancellationToken cancellationToken)
    {
        return _context.Users.FirstOrDefaultAsync(x => x.Email.Trim().ToLower() == email.Trim().ToLower(), cancellationToken)!;
    }

    public Task<User> GetById(string id, CancellationToken cancellationToken)
    {
        return _context.Users.FirstOrDefaultAsync(x => x.Id == id, cancellationToken)!;
    }

    public void Update(User entity)
    {
        _context.Users.Update(entity);
    }
}
