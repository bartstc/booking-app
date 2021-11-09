using System.Reflection;
using Core.Commands;
using MediatR;
using MediatR.Pipeline;
using Microsoft.Extensions.DependencyInjection;

namespace Core
{
    public static class Startup
    {
        public static IServiceCollection AddCoreServices(this IServiceCollection services, Assembly applicationAssembly)
        {
            return services
                .AddMediatR(applicationAssembly)
                .AddScoped(typeof(IRequestPostProcessor<,>), typeof(UnitOfWorkCommandHandlerPostProcessor<,>))
                .AddSingleton<IAssemblyProvider>(sp =>
                    new AssemblyProvider(applicationAssembly));;
        }
    }
}
