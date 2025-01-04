using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Task = TodoList.Domain.Entities.Task;

namespace TodoList.Persistence.Configurations;

public class TaskConfiguration : IEntityTypeConfiguration<Task>
{
    public void Configure(EntityTypeBuilder<Task> builder)
    {
        builder.HasKey(u => u.Id);

        builder.Property(u => u.Id)
          .HasDefaultValueSql("gen_random_uuid()");

        builder.Property(u => u.Title)
            .IsRequired();

        builder.Property(u => u.Description)
            .IsRequired(false);
    }
}
