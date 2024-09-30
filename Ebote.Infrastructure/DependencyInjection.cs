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

    internal static IServiceCollection AddPostgresDbContext(this IServiceCollection services, DbSettings? dbSettings)
    {
        if (dbSettings is null)
            throw new Exception("dbSettings not found.");
            
        services.AddDbContext<PostrgresDbContext>(builder => 
        {
            builder.UseNpgsql(dbSettings.ConnectionString, conf =>
            {
                conf.SetPostgresVersion(new Version(dbSettings.MajorVersion, dbSettings.MinorVersion));
                conf.MigrationsAssembly(nameof(Infrastructure));
                conf.MigrationsHistoryTable(dbSettings.EfMigrationsHistoryTableName, dbSettings.SchemaName);
            });
        });

        return services;
    }

    internal static IServiceCollection AddRepositories(this IServiceCollection services)
    {
        services.AddTransient<IAccountRepository, AccountRepository>();

        return services;
    }
}
