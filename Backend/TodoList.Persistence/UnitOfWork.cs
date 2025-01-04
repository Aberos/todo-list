using TodoList.Domain.Abstractions;
using TodoList.Persistence.Contexts;

namespace TodoList.Persistence;

public class UnitOfWork : IUnitOfWork
{
    private readonly TodoContext _context;
    public UnitOfWork(TodoContext context)
    {
        _context = context;
    }

    public Task CommitAsync(CancellationToken cancellationToken)
    {
        return _context.SaveChangesAsync(cancellationToken);
    }
}
