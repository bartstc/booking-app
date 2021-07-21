using System;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Configuration;
using Core.Marten;
using Core.Processing;

namespace Community.Infrastructure
{
    public static class Startup
    {
        public static IServiceCollection AddCommunityModule(this IServiceCollection services,
            IConfiguration configuration)
        {
            return services
                .AddMember()
                .AddProcessing()
                .AddMarten(configuration, options =>
                {
                    options.ConfigureMembers();
                });
        }
    }
}
