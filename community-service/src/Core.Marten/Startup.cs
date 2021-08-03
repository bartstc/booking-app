using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Marten;
using System;
using Weasel.Postgresql;

namespace Core.Marten
{
    public static class Startup
    {
        private const string configKey = "EventStore";

        public static IServiceCollection AddMarten(this IServiceCollection services,
            IConfiguration config,
            Action<StoreOptions> configureOptions = null)
        {
            var eventStoreConfig = config.GetSection(configKey).Get<Config>();

            var documentStore = services
                .AddMarten(options =>
                {
                    options.Connection(eventStoreConfig.ConnectionString);

                    options.AutoCreateSchemaObjects = AutoCreate.All;

                    configureOptions?.Invoke(options);
                })
                .InitializeStore();
            
            documentStore.Schema.ApplyAllConfiguredChangesToDatabase();

            return services;
        }
    }
}
