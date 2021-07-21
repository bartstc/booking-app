using Community.Application.Members.DomainServices;
using Community.Domain.Members;
using Core.Domain.Repositories;
using Core.Marten.Repositories;
using Marten;
using Microsoft.Extensions.DependencyInjection;

namespace Community.Infrastructure
{
    public static class StartupMember
    {
        public static IServiceCollection AddMember(this IServiceCollection services)
        {
            return services
                .AddScoped<IRepository<Member>, MartenRepository<Member>>()
                .AddTransient<IMemberUniquenessChecker, MemberUniquenessChecker>();
        }

        internal static void ConfigureMembers(this StoreOptions options)
        {
            // projections
            // options.Projections.Add<>();
        }
    }
}
