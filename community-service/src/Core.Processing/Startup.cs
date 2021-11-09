using Core.Domain.UnitOfWork;
using Core.Marten.UnitOfWork;
using Core.Processing.DomainEventDispatcher;
using Core.Processing.UnitOfWork;
using Microsoft.Extensions.DependencyInjection;

namespace Core.Processing
{
    public static class Startup
    {
        public static IServiceCollection AddProcessing(this IServiceCollection services)
        {
            services
                .AddScoped<IUnitOfWork, UnitOfWork.UnitOfWork>()
                .AddScoped<ITransactionalDocumentSessionFactory, TransactionalDocumentSessionFactory>()
                .AddScoped<IDomainEventsDispatcher, DomainEventsDispatcher>()
                .AddSingleton<IDomainEventNotificationProvider, DomainEventNotificationProvider>();
            
            return services;
        }
    }
}
