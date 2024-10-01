using Ebote.Domain.Entities;
using Ebote.Infrastructure.Settings;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

namespace Ebote.Infrastructure.DbContexts;

public class PostgresDbContext(DbContextOptions options, IOptions<DbSettings> dbSettings): DbContext(options)
{
    public DbSet<Account> Accounts { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.HasDefaultSchema(dbSettings.Value.SchemaName);

        modelBuilder.Entity<Account>()
            .HasIndex(x => x.Login)
            .IsUnique();

        base.OnModelCreating(modelBuilder);
    }
}
