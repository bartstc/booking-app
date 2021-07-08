using Core.Domain.Repositories;
using Core.Marten.Repositories;
using Enterprise.Facilities.Projections;
using Marten;
using Microsoft.Extensions.DependencyInjection;

namespace Enterprise.Facilities
{
    public static class StartupFacilities
    {
        internal static IServiceCollection AddFacilities(this IServiceCollection services)
        {
            return services.AddScoped<IRepository<Facility>, MartenRepository<Facility>>();
        }

        internal static void ConfigureFacilities(this StoreOptions options)
        {
            options.Projections.SelfAggregate<Facility>();
            options.Projections.Add<FacilityOfferReportProjection>();
        }
    }
}
