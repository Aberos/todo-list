namespace TodoList.Domain.Settings;

public record TokenSettings(string SecretKey, int ExpirationTimeInHours)
{
}
