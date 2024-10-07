using Microsoft.Extensions.DependencyInjection;

namespace Ebote.Core;

public static class DependencyInjection
{
    public static IServiceCollection AddEboteDomain(this IServiceCollection services)
    {
        services.AddSingleton<GameStorage>();
        return services;
    }
}
