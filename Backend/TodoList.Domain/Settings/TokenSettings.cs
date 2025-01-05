namespace TodoList.Domain.Settings;

public class TokenSettings
{
    public string? SecretKey { get; set; }

    public int ExpirationTimeInHours { get; set; }
}
