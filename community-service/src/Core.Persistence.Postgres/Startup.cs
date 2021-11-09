using Core.Database;
using Microsoft.Extensions.DependencyInjection;

namespace Core.Persistence.Postgres
{
    public static class Startup
    {
        public static IServiceCollection AddPostgres(this IServiceCollection services,
            string connectionString)
        {
            services
                .AddScoped<IDbConnectionFactory>(x => new NpgsqlConnectionFactory(connectionString));

            return services;
        }
    }
}
