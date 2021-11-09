using Microsoft.Extensions.DependencyInjection;
using Marten;
using System;
using Weasel.Postgresql;

namespace Core.Marten
{
    public static class Startup
    {
        public static IServiceCollection AddMarten(this IServiceCollection services,
            Config config,
            Action<StoreOptions> configureOptions = null)
        {
            var documentStore = services
                .AddMarten(options =>
                {
                    options.Connection(config.ConnectionString);

                    options.AutoCreateSchemaObjects = AutoCreate.All;

                    configureOptions?.Invoke(options);
                })
                .InitializeStore();
            
            documentStore.Schema.ApplyAllConfiguredChangesToDatabase();

            return services;
        }
    }
}
