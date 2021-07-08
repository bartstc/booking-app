using Core.Marten;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Core.Processing;
using Enterprise.Facilities;

namespace Enterprise
{
    public static class Startup
    {
        public static IServiceCollection AddEnterpriseModule(this IServiceCollection services,
            IConfiguration config)
        {
            return services
                .AddProcessing()
                .AddMarten(config, storeOptions =>
                {
                    storeOptions.ConfigureFacilities();
                })
                .AddFacilities();
        }
    }
}
