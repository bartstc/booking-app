using System.Reflection;
using MediatR;
using Microsoft.Extensions.DependencyInjection;

namespace Core
{
    public static class Startup
    {
        public static IServiceCollection AddCoreServices(this IServiceCollection services, Assembly applicationAssembly)
        {
            return services
                .AddMediatR(applicationAssembly)
                .AddSingleton<IAssemblyProvider>(sp =>
                    new AssemblyProvider(applicationAssembly));
        }
    }
}
