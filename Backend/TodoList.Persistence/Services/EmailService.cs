using System.Net;
using System.Net.Mail;
using TodoList.Domain.Abstractions;
using TodoList.Domain.Settings;

namespace TodoList.Persistence.Services;

public class EmailService : IEmailService
{
    private readonly EmailSettings _settings;
    public EmailService(EmailSettings settings)
    {
        _settings = settings;
    }

    public async Task Send(string email, string subject, string body, bool isBodyHtml, CancellationToken cancellationToken)
    {
        var fromAddress = new MailAddress(_settings.FromAddress);
        var toAddress = new MailAddress(email);

        var smtpClient = new SmtpClient(_settings.SmtpServer)
        {
            Port = _settings.SmtpPort,
            Credentials = new NetworkCredential(_settings.SmtpUser, _settings.SmtpPassword),
            EnableSsl = true,
            Timeout = 30000
        };

        var mailMessage = new MailMessage(fromAddress, toAddress)
        {
            Subject = subject,
            Body = body,
            IsBodyHtml = isBodyHtml
        };

        try
        {
            await smtpClient.SendMailAsync(mailMessage, cancellationToken);
        }
        catch (Exception)
        {
            throw new Exception("Não foi possível enviar o e-mail.");
        }
    }
}
