namespace TodoList.Domain.Settings;

public record EmailSettings(string FromAddress, string SmtpServer, int SmtpPort, string SmtpUser, string SmtpPassword)
{
}
