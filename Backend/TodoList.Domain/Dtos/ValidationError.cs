namespace TodoList.Domain.Dtos;

public class ValidationError
{
    public required string PropertyName { get; set; }

    public required string ErrorMessage { get; set; }
}
