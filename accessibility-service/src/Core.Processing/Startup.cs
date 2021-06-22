using System.Reflection;
using Core.Domain.UnitOfWork;
using Core.Processing.Outbox;
using MediatR;
using MediatR.Pipeline;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace Core.Processing
{
    public static class Startup
    {
        public static IServiceCollection AddProcessing<TDbContext>(this IServiceCollection services, Assembly applicationAssembly) where TDbContext : DbContext
        {
            services
                .AddScoped<IUnitOfWork, UnitOfWork<TDbContext>>()
                .AddTransient<IDomainEventsDispatcher, DomainEventsDispatcher<TDbContext>>()
                .AddSingleton<IDomainEventNotificationProvider>(sp =>
                    new DomainEventNotificationProvider(sp.GetRequiredService<IAssemblyProvider>()))
                .AddScoped(typeof(IRequestPostProcessor<,>), typeof(UnitOfWorkCommandHandlerPostProcessor<,>))
                .Decorate(typeof(INotificationHandler<>), typeof(DomainEventsDispatcherNotificationHandlerDecorator<>))
                .AddScoped<IRequestHandler<ProcessOutboxCommand, Unit>, ProcessOutboxCommandHandler>()
                .AddHostedService<ProcessOutboxHostedService>();
            
            return services;
        }
    }
}
