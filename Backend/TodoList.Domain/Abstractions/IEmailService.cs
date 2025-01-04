namespace TodoList.Domain.Abstractions;

public interface IEmailService
{
    Task Send(string email, string body, bool html = true);
}
