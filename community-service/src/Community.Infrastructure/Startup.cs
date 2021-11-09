using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Configuration;
using Core.Marten;
using Core.Processing;
using Core.RabbitMQ.MassTransit;
using Community.Infrastructure.IdentityProvider.Auth0;
using Config = Core.Marten.Config;
using Core.Persistence.Postgres;

namespace Community.Infrastructure
{
    public static class Startup
    {
        private const string configKey = "EventStore";
        
        public static IServiceCollection AddCommunityModule(this IServiceCollection services,
            IConfiguration configuration)
        {
            var eventStoreConfig = configuration.GetSection(configKey).Get<Config>();

            return services
                .AddMember()
                .AddProcessing()
                .AddPostgres(eventStoreConfig.ConnectionString)
                .AddMarten(eventStoreConfig, options =>
                {
                    options.ConfigureMembers();
                })
                .AddMassTransit(configuration,
                    x =>
                    {
                        x.AddMemberConsumers();
                    },
                    (context, cfg) =>
                    {
                        cfg.AddMemberEndpoints(context);
                    })
                .AddAutoMapper(typeof(Startup).Assembly)
                .AddSingleton<IAuth0TokenService, Auth0TokenService>();
        }
    }
}
