using TodoList.Domain.Dtos;
using TodoList.Domain.Entities;

namespace TodoList.Domain.Repositories;

public interface IRepositoryBase<T> where T : EntityBase
{
    Task<T> GetById(string id, CancellationToken cancellationToken);
    void Create (T entity);
    void Update(T entity);
    void Delete(T entity);
}
