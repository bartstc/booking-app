using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Microsoft.Extensions.DependencyInjection;

namespace Core.Persistence.Postgres
{
    public static class Startup
    {
        public static IServiceCollection AddPostgres<TContext>(this IServiceCollection services,
            string connectionString) where TContext : DbContext
        {
            services.AddDbContext<TContext>(options =>
                options
                    .ReplaceService<IValueConverterSelector, StronglyTypedIdValueConverterSelector>()
                    .UseNpgsql(connectionString));

            return services;
        }
    }
}
