using TaskStatus= TodoList.Domain.Enums.TaskStatus;

namespace TodoList.Domain.Dtos;

public record TaskFiltersRequest(int Page, int PageSize, string Search, IEnumerable<TaskStatus> Status)
{
}
