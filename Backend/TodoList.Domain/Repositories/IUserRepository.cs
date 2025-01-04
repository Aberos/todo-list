using TodoList.Domain.Entities;

namespace TodoList.Domain.Repositories;

public interface IUserRepository : IRepositoryBase<User>
{
    Task<User> GetByEmail(string email, CancellationToken cancellationToken);
}
