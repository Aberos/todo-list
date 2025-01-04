namespace TodoList.Domain.Entities;

public abstract class EntityBase
{
    public string? Id { get; set; }

    public DateTime CreatedDate { get; set; }
}
