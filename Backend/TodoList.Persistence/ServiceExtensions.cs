using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using TodoList.Domain.Abstractions;
using TodoList.Domain.Repositories;
using TodoList.Domain.Settings;
using TodoList.Persistence.Contexts;
using TodoList.Persistence.Repositories;
using TodoList.Persistence.Services;

namespace TodoList.Persistence;

public static class ServiceExtensions
{
    public static void ConfigureInfrastructureServices(this IServiceCollection services,
          IConfiguration configuration)
    {
        AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);
        services.AddDbContext<TodoContext>(options => options.UseNpgsql(configuration["ConnectionStrings:TodoDB"]));
        services.AddScoped<IUnitOfWork, UnitOfWork>();
        services.AddScoped<IUserRepository, UserRepository>();
        services.AddScoped<ITaskRepository, TaskRepository>();
        services.AddScoped<ITokenService, TokenService>();
        services.AddScoped<IActiveUser, ActiveUser>();
        services.AddScoped<IEmailService, EmailService>();
        services.AddHttpContextAccessor();

        services.Configure<TokenSettings>(configuration.GetSection("TokenSettings"));
        services.AddSingleton(resolver => resolver.GetRequiredService<IOptions<TokenSettings>>().Value);
        services.Configure<EmailSettings>(configuration.GetSection("EmailSettings"));
        services.AddSingleton(resolver => resolver.GetRequiredService<IOptions<EmailSettings>>().Value);

        var tokenSecretKey = Encoding.ASCII.GetBytes(configuration["TokenSettings:SecretKey"]!);
        services.AddAuthentication(x =>
        {
            x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
            x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
        }).AddJwtBearer(x =>
        {
            x.RequireHttpsMetadata = false;
            x.SaveToken = true;
            x.TokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(tokenSecretKey),
                ValidateIssuer = false,
                ValidateAudience = false
            };
        });
    }

    public static void ConfigureInfrastructureApp(this IApplicationBuilder app)
    {
        app.UseAuthentication();
        app.UseAuthorization();

        using var scope = app.ApplicationServices.CreateScope();
        var todoContext = scope.ServiceProvider.GetRequiredService<TodoContext>();
        todoContext.Database.EnsureCreated();
    }
}
