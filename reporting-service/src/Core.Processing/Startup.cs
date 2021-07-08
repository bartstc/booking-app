using Core.Domain.UnitOfWork;
using Microsoft.Extensions.DependencyInjection;

namespace Core.Processing
{
    public static class Startup
    {
        public static IServiceCollection AddProcessing(this IServiceCollection services)
        {
            services
                .AddScoped<IUnitOfWork, UnitOfWork>();
            
            return services;
        }
    }
}
