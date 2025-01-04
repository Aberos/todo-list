namespace TodoList.Domain.Abstractions;

public interface IActiveUser
{
    string Id { get; }
    public string Name { get; }
    public string Email { get; }
}
