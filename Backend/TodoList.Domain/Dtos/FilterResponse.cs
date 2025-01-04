using TodoList.Domain.Entities;

namespace TodoList.Domain.Dtos;

public record FilterResponse<T>(int Page, int PageSize, long TotalCount, IEnumerable<T> Data) where T : EntityBase
{
}
