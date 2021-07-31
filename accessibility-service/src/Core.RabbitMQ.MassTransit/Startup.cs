using System;
using Core.IntegrationEvents;
using MassTransit;
using MassTransit.ExtensionsDependencyInjectionIntegration;
using MassTransit.RabbitMqTransport;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Core.RabbitMQ.MassTransit
{
    public static class Startup
    {
        private const string configKey = "RabbitMQ";

        public static IServiceCollection AddMassTransit(this IServiceCollection services,
            IConfiguration config,
            Action<IServiceCollectionBusConfigurator> configureConsumers = null,
            Action<IBusRegistrationContext, IRabbitMqBusFactoryConfigurator> configureReceiveEndpoints = null)
        {
            var rabbitMqConfig = config.GetSection(configKey).Get<Config>();

            return services
                .AddMassTransit(x =>
                {
                    configureConsumers?.Invoke(x);

                    x.UsingRabbitMq((context, cfg) =>
                    {
                        cfg.Host(rabbitMqConfig.HostName, cfgH =>
                        {
                            cfgH.Username(rabbitMqConfig.Username);
                            cfgH.Password(rabbitMqConfig.Password);
                        });

                        configureReceiveEndpoints?.Invoke(context, cfg);
                    });
                })
                .AddMassTransitHostedService()
                .AddTransient<IMessageBus, RabbitMQMessageBus>()
                .AddTransient(typeof(IRequestBus<>), typeof(RabbitMQRequestBus<>));
        }
    }
}
