using Accessibility.Application.Facilities;
using Accessibility.Infrastructure.Application.Facilities;
using Accessibility.Infrastructure.Application.Facilities.Employees;
using Accessibility.Infrastructure.IntegrationEvents.EventHandling.Facilities;
using MassTransit;
using MassTransit.ExtensionsDependencyInjectionIntegration;
using MassTransit.RabbitMqTransport;
using Microsoft.Extensions.DependencyInjection;

namespace Accessibility.Infrastructure
{
    public static class StartupFacility
    {
        public static IServiceCollection AddFacility(this IServiceCollection services)
        {
            return services
                .AddTransient<IOfferRepository, OfferRepository>()
                .AddTransient<IOfferQueryRepository, OfferQueryRepository>()
                .AddTransient<IEmployeeRepository, EmployeeRepository>();
        }

        public static void AddFacilityConsumers(this IServiceCollectionBusConfigurator cfg)
        {
            cfg.AddConsumer<OfferAddedConsumer>();
            cfg.AddConsumer<OfferDeactivatedConsumer>();
            cfg.AddConsumer<OfferActivatedConsumer>();
            cfg.AddConsumer<EmployeeAddedConsumer>();
            cfg.AddConsumer<EmployeeDeactivatedConsumer>();
            cfg.AddConsumer<EmployeeActivatedConsumer>();
        }

        public static void AddFacilityEndpoints(this IRabbitMqBusFactoryConfigurator cfg, IBusRegistrationContext context)
        {
            cfg.ReceiveEndpoint("offer-added-accessibility", e =>
                e.ConfigureConsumer<OfferAddedConsumer>(context));
            
            cfg.ReceiveEndpoint("offer-deactivated-accessibility", e =>
                e.ConfigureConsumer<OfferDeactivatedConsumer>(context));
            
            cfg.ReceiveEndpoint("offer-activated-accessibility", e =>
                e.ConfigureConsumer<OfferActivatedConsumer>(context));
            
            cfg.ReceiveEndpoint("employee-added-accessibility", e =>
                e.ConfigureConsumer<EmployeeAddedConsumer>(context));
            
            cfg.ReceiveEndpoint("employee-deactivated-accessibility", e =>
                e.ConfigureConsumer<EmployeeDeactivatedConsumer>(context));
            
            cfg.ReceiveEndpoint("employee-activated-accessibility", e =>
                e.ConfigureConsumer<EmployeeActivatedConsumer>(context));
        }
    }
}
