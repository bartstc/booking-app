using Accessibility.Application.Configuration.Database;
using Accessibility.Domain.Bookings;
using Accessibility.Domain.SeedWork;
using Accessibility.Infrastructure.Database;
using Accessibility.Infrastructure.Domain;
using Accessibility.Infrastructure.Domain.Bookings;
using Accessibility.Infrastructure.Processing;
using Accessibility.Infrastructure.Processing.Outbox;
using Accessibility.Infrastructure.SeedWork;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Microsoft.Extensions.DependencyInjection;
using MediatR;
using Accessibility.Domain.Bookings.BookedRecords;
using Accessibility.Application.Bookings.Book;
using System.Reflection;
using Accessibility.Domain.Schedules;
using Accessibility.Application.Schedules.DomainServices;
using Accessibility.Infrastructure.Domain.Schedules;
using Microsoft.Extensions.ObjectPool;
using RabbitMQ.Client;
using Accessibility.Infrastructure.Processing.EventBus.RabbitMQ;
using Accessibility.Application.Bookings.Book.EventBus;
using Microsoft.Extensions.Configuration;

namespace Accessibility.Infrastructure
{
    public static class Startup
    {
        // TODO: split registrations into modules
        public static IServiceCollection ConfigureAccessibility(this IServiceCollection services, IConfiguration configuration, Assembly applicationAssembly)
        {
            var connectionString = configuration.GetConnectionString("Accessibility");

            services.AddDbContext<AccessibilityContext>(options =>
                options
                    .ReplaceService<IValueConverterSelector, StronglyTypedIdValueConverterSelector>()
                    .UseNpgsql(connectionString))
                .AddMediatR(typeof(BookedNotification).Assembly, typeof(BookedEvent).Assembly, typeof(ProcessOutboxCommand).Assembly)
                .AddTransient<IBookingRepository, BookingRepository>()
                .AddTransient<IScheduleRepository, ScheduleRepository>()
                .AddTransient<ISchedulePeriodOfTimeChecker, SchedulePeriodOfTimeChecker>()
                .AddTransient<IUnitOfWork, UnitOfWork>()
                .AddTransient<IDomainEventsDispatcher, DomainEventsDispatcher>()
                //.AddHostedService<ProcessOutboxHostedService>()
                .AddScoped<ISqlConnectionFactory>(x => new SqlConnectionFactory(connectionString))
                .AddSingleton<IAssemblyProvider>(x => new AssemblyProvider(applicationAssembly))

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

            return services;
        }
    }
}