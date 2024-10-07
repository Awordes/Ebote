using Ebote.Domain.Repositories;
using Ebote.Infrastructure.DbContexts;
using Ebote.Infrastructure.Repositories;
using Ebote.Infrastructure.Settings;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace Ebote.Infrastructure;

public static class DependencyInjection
{
    public static IServiceCollection AddInfrastructure(this IServiceCollection services, DbSettings? dbSettings)
    {
        services.AddPostgresDbContext(dbSettings);
        services.AddRepositories();
        
        return services;
    }
    
    public static async Task<IServiceProvider> UseUnfrastructure(this IServiceProvider provider)
    {
        var dbContext = provider.GetRequiredService<PostgresDbContext>();
        await dbContext.Database.MigrateAsync();
        return provider;
    }

    internal static IServiceCollection AddPostgresDbContext(this IServiceCollection services, DbSettings? dbSettings)
    {
        if (dbSettings is null)
            throw new Exception("dbSettings not found.");
            
        services.AddDbContext<PostgresDbContext>(builder => 
        {
            builder.UseNpgsql(dbSettings.ConnectionString, conf =>
            {
                conf.SetPostgresVersion(new Version(dbSettings.MajorVersion, dbSettings.MinorVersion));
                conf.MigrationsHistoryTable(dbSettings.EfMigrationsHistoryTableName, dbSettings.SchemaName);
            });
        });

        return services;
    }

    internal static IServiceCollection AddRepositories(this IServiceCollection services)
    {
        services.AddTransient<IAccountRepository, AccountRepository>();
        services.AddTransient<ILobbyRepository, LobbyRepository>();
        services.AddTransient<IProfileRepository, ProfileRepository>();

        return services;
    }
}
