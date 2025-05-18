using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Ebote.Core;

public static class DependencyInjection
{
    public static IServiceCollection AddEboteDomain(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddSingleton<GameStorage>();
        configuration.GetSection(GameConstants.SectionName).Bind(GameConstants.Consts);
        return services;
    }
}
