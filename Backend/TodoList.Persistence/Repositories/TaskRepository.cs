using Microsoft.EntityFrameworkCore;
using TodoList.Domain.Abstractions;
using TodoList.Domain.Dtos;
using TodoList.Domain.Repositories;
using TodoList.Persistence.Contexts;

namespace TodoList.Persistence.Repositories;

public class TaskRepository : ITaskRepository
{
    private readonly TodoContext _context;
    private readonly IActiveUser _activeUser;
    public TaskRepository(TodoContext context, IActiveUser activeUser)
    {
        _context = context;
        _activeUser = activeUser;
    }

    public void Create(Domain.Entities.Task entity)
    {
        entity.CreatedDate = DateTime.Now;
        entity.UserId = _activeUser.Id;

        _context.Tasks.Add(entity);
    }

    public void Delete(Domain.Entities.Task entity)
    {
        _context.Tasks.Remove(entity);
    }

    public Task<Domain.Entities.Task> GetById(string id, CancellationToken cancellationToken)
    {
        return _context.Tasks.FirstOrDefaultAsync(x => x.Id == id && x.UserId == _activeUser.Id, cancellationToken)!;
    }

    public async Task<FilterResponse<Domain.Entities.Task>> GetFilteredList(TaskFiltersRequest filter, CancellationToken cancellationToken)
    {
        var page = filter.Page > 0 ? filter.Page : 1;
        var take = filter.PageSize > 0 ? filter.PageSize : 10;
        var skip = (filter.Page - 1) * take;

        var query = _context.Tasks.AsQueryable().Where(x => x.UserId == _activeUser.Id);

        if (!string.IsNullOrEmpty(filter.Search))
            query = query.Where(x => (x.Title.Contains(filter.Search) || x.Description!.Contains(filter.Search)));

        if (filter?.Status?.Count > 0)
            query = query.Where(x => filter.Status.Contains(x.Status));

        var totalCount = await query.CountAsync(cancellationToken);

        var data = await query.OrderBy(x => x.CreatedDate)
            .Skip(skip)
            .Take(take)
            .ToListAsync(cancellationToken);

        return new FilterResponse<Domain.Entities.Task>(page, take, totalCount, data);
    }

    public void Update(Domain.Entities.Task entity)
    {
        _context.Tasks.Update(entity);
    }
}
