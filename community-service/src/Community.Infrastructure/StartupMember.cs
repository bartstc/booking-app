using Community.Application.Members;
using Community.Application.Members.DomainServices;
using Community.Domain.Members;
using Community.Infrastructure.Application.Members;
using Community.Infrastructure.IntegrationEvents.Members;
using Core.Domain.Repositories;
using Core.Marten.Repositories;
using Marten;
using MassTransit;
using MassTransit.ExtensionsDependencyInjectionIntegration;
using MassTransit.RabbitMqTransport;
using Microsoft.Extensions.DependencyInjection;

namespace Community.Infrastructure
{
    public static class StartupMember
    {
        public static IServiceCollection AddMember(this IServiceCollection services)
        {
            return services
                .AddScoped<IRepository<Member>, MartenRepository<Member>>()
                .AddScoped<IMemberRepository, MemberRepository>()
                .AddTransient<IMemberUniquenessChecker, MemberUniquenessChecker>();
        }

        internal static void ConfigureMembers(this StoreOptions options)
        {
            // TODO: Use specyfic projection instead
            options.Projections.SelfAggregate<Member>();
            
            // projections
            // options.Projections.Add<>();
        }

        internal static void AddMemberConsumers(this IServiceCollectionBusConfigurator cfg)
        {
            cfg.AddConsumer<BookingRecordFulfilledConsumer>();
        }

        internal static void AddMemberEndpoints(this IRabbitMqBusFactoryConfigurator cfg, IBusRegistrationContext context)
        {
            cfg.ReceiveEndpoint("booking-record-fulfilled-community", e =>
                e.ConfigureConsumer<BookingRecordFulfilledConsumer>(context));
        }
    }
}
