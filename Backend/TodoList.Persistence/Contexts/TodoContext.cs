using Microsoft.EntityFrameworkCore;
using TodoList.Domain.Entities;
using Task = TodoList.Domain.Entities.Task;

namespace TodoList.Persistence.Contexts;

public class TodoContext : DbContext
{
    public DbSet<User> Users { get; set; }

    public DbSet<Task> Tasks { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(TodoContext).Assembly);
        base.OnModelCreating(modelBuilder);
    }
}
