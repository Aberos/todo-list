using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TodoList.Domain.Entities;

namespace TodoList.Persistence.Configurations;

public class UserConfiguration : IEntityTypeConfiguration<User>
{
    public void Configure(EntityTypeBuilder<User> builder)
    {
        builder.HasKey(u => u.Id);

        builder.Property(u => u.Id)
          .HasDefaultValueSql("gen_random_uuid()");

        builder.Property(u => u.Name)
           .IsRequired();

        builder.Property(u => u.Email)
           .IsRequired();

        builder.HasMany(u => u.Tasks)
               .WithOne(t => t.User)
               .HasForeignKey(p => p.UserId);
    }
}
