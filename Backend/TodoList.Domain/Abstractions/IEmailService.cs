namespace TodoList.Domain.Abstractions;

public interface IEmailService
{
    Task Send(string email, string subject, string body, bool isBodyHtml, CancellationToken cancellationToken);
}
