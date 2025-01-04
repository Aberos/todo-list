using TodoList.Domain.Dtos;
using Task = TodoList.Domain.Entities.Task;
namespace TodoList.Domain.Repositories;

public interface ITaskRepository : IRepositoryBase<Task>
{
    Task<FilterResponse<Task>> GetFilteredList(TaskFiltersRequest filter, CancellationToken cancellationToken);
}
