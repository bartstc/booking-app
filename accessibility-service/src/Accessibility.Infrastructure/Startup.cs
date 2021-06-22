using Accessibility.Infrastructure.Database;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Configuration;
using MassTransit;
using Core.Persistence.Postgres;
using Core.RabbitMQ.MassTransit;
using Core.Processing;
using System.Reflection;

namespace Accessibility.Infrastructure
{
    public static class Startup
    {
        public static IServiceCollection AddAccessibilityModule(this IServiceCollection services,
            IConfiguration configuration,
            Assembly applicationAssembly)
        {
            var connectionString = configuration.GetConnectionString("Accessibility");

            services
                .AddBooking()
                .AddSchedule()
                .AddFacility()
                .AddPostgres<AccessibilityContext>(connectionString)
                .AddProcessing<AccessibilityContext>(applicationAssembly)
                .AddMassTransit(configuration,
                    x =>
                    {
                        x.AddBookingConsumers();
                        x.AddFacilityConsumers();
                    },
                    (context, cfg) =>
                    {
                        cfg.AddBookingEndpoints(context);
                        cfg.AddFacilityEndpoints(context);
                    });
            return services;
        }
    }
}