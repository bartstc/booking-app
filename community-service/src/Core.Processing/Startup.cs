using Core.Domain.UnitOfWork;
using Core.Marten.DomainEvents;
using Core.Processing.DomainEventDispatcher;
using Microsoft.Extensions.DependencyInjection;

namespace Core.Processing
{
    public static class Startup
    {
        public static IServiceCollection AddProcessing(this IServiceCollection services)
        {
            services
                .AddScoped<IUnitOfWork, UnitOfWork>()
                .AddScoped<IDomainEventCollector, DomainEventCollector>();
            
            return services;
        }
    }
}
