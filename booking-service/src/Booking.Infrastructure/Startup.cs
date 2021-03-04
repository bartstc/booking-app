using System.Reflection;
using Booking.Application.Bookings.IntegrationEvents.EventHandling;
using Booking.Application.Configuration.Database;
using Booking.Application.Facilities;
using Booking.Application.Facilities.IntegrationEvents.EventHandling;
using Booking.Domain.Bookings;
using Booking.Domain.SeedWork;
using Booking.Infrastructure.Database;
using Booking.Infrastructure.Domain;
using Booking.Infrastructure.Domain.Bookings;
using Booking.Infrastructure.IntegrationEvents.Facilities;
using Booking.Infrastructure.Processing;
using Booking.Infrastructure.SeedWork;
using MassTransit;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Booking.Infrastructure
{
    public static class Startup
    {
        public static IServiceCollection ConfigureBooking(
            this IServiceCollection services,
            IConfiguration configuration,
            Assembly applicationAssembly,
            Assembly domainAssembly)
        {
            var connectionString = configuration.GetConnectionString("Booking");

            services.AddDbContext<BookingContext>(options =>
                options
                    .ReplaceService<IValueConverterSelector, StronglyTypedIdValueConverterSelector>()
                    .UseNpgsql(connectionString))
                .AddMediatR(applicationAssembly, domainAssembly, typeof(Startup).Assembly)
                .AddTransient<IBookingRepository, BookingRepository>()
                .AddTransient<IOfferRepository, OfferRepository>()
                .AddTransient<IUnitOfWork, UnitOfWork>()
                .AddTransient<IDomainEventsDispatcher, DomainEventsDispatcher>()
                //.AddHostedService<ProcessOutboxHostedService>()
                .AddScoped<ISqlConnectionFactory>(x => new SqlConnectionFactory(connectionString))
                .AddSingleton<IAssemblyProvider>(x => new AssemblyProvider(applicationAssembly))
                .ConfigureEventBus(configuration);
            
            return services;
        }

        private static IServiceCollection ConfigureEventBus(this IServiceCollection services, IConfiguration configuration)
        {
            return services.AddMassTransit(x =>
            {
                x.AddConsumer<ProcessBookingOrderConsumer>()
                    .Endpoint(e => {e.ConcurrentMessageLimit = 1;});
                x.AddConsumer<OfferCreatedConsumer>();

                x.UsingRabbitMq((context, cfg) =>
                {
                    cfg.Host(configuration["RabbitMQ:HostName"]);
                    
                    cfg.ReceiveEndpoint("booking-orders-listener", e =>
                        e.ConfigureConsumer<ProcessBookingOrderConsumer>(context));
                    
                    cfg.ReceiveEndpoint("offer-created-listener", e =>
                        e.ConfigureConsumer<OfferCreatedConsumer>(context));
                });
            })
            .AddMassTransitHostedService();
        }
    }
}
