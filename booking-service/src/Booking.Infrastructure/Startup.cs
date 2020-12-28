using System.Reflection;
using Booking.Application.Bookings.Book.EventBus;
using Booking.Application.Configuration.Database;
using Booking.Domain.Bookings;
using Booking.Domain.SeedWork;
using Booking.Infrastructure.Database;
using Booking.Infrastructure.Domain;
using Booking.Infrastructure.Domain.Bookings;
using Booking.Infrastructure.Processing;
using Booking.Infrastructure.Processing.EventBus.RabbitMQ;
using Booking.Infrastructure.SeedWork;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.ObjectPool;
using RabbitMQ.Client;

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
                .AddTransient<IUnitOfWork, UnitOfWork>()
                .AddTransient<IDomainEventsDispatcher, DomainEventsDispatcher>()
                //.AddHostedService<ProcessOutboxHostedService>()
                .AddScoped<ISqlConnectionFactory>(x => new SqlConnectionFactory(connectionString))
                .AddSingleton<IAssemblyProvider>(x => new AssemblyProvider(applicationAssembly))
                .ConfigureRabbitMQ(configuration);
            
            return services;
        }

        private static IServiceCollection ConfigureRabbitMQ(this IServiceCollection services, IConfiguration configuration)
        {
            return services
                .AddSingleton<ObjectPoolProvider, DefaultObjectPoolProvider>()
                .AddSingleton<IPooledObjectPolicy<IModel>, RabbitMQChannelPooledObjectPolicy>()
                .AddSingleton<ObjectPool<IModel>>(serviceProvider =>
                {
                    var provider = serviceProvider.GetRequiredService<ObjectPoolProvider>();
                    var policy = serviceProvider.GetRequiredService<IPooledObjectPolicy<IModel>>();
                    return provider.Create(policy);
                })
                .AddTransient<IBookEventBus, BookRabbitEventBus>()
                .Configure<RabbitMQOptions>(configuration.GetSection("RabbitMQ"));
        }
    }
}
