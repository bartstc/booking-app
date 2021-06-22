using Accessibility.Application.Bookings.Commands.CreateBookingRequest;
using Accessibility.Application.Bookings.DomainServices;
using Accessibility.Application.Bookings.Queries;
using Accessibility.Domain.Bookings;
using Accessibility.Infrastructure.Application.Bookings;
using Accessibility.Infrastructure.Domain.Bookings;
using Accessibility.Infrastructure.IntegrationEvents.EventHandling.Bookings;
using MassTransit;
using MassTransit.ExtensionsDependencyInjectionIntegration;
using MassTransit.RabbitMqTransport;
using MediatR;
using Microsoft.Extensions.DependencyInjection;

namespace Accessibility.Infrastructure
{
    public static class StartupBooking
    {
        public static IServiceCollection AddBooking(this IServiceCollection services)
        {
            return services
                .AddScoped<IRequestHandler<CreateBookingRequestCommand>, CreateBookingRequestCommandHandler>()
                .AddTransient<IBookingRepository, BookingRepository>()
                .AddTransient<IBookingQueryRepository, BookingQueryRepository>()
                .AddTransient<IBookingPeriodOfTimeChecker, BookingPeriodOfTimeChecker>();
        }

        public static void AddBookingConsumers(this IServiceCollectionBusConfigurator cfg)
        {
            cfg.AddConsumer<BookingRequestedConsumer>()
                .Endpoint(e => {e.ConcurrentMessageLimit = 1;});
        }

        public static void AddBookingEndpoints(this IRabbitMqBusFactoryConfigurator cfg, IBusRegistrationContext context)
        {
            cfg.ReceiveEndpoint("booking-requests", e =>
                e.ConfigureConsumer<BookingRequestedConsumer>(context));
        }
    }
}
