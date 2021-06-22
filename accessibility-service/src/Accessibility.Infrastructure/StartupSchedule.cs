using Accessibility.Application.Availabilities.Queries;
using Accessibility.Application.Schedules;
using Accessibility.Application.Schedules.DomainServices;
using Accessibility.Domain.Schedules;
using Accessibility.Infrastructure.Application.Availabilities;
using Accessibility.Infrastructure.Application.Schedules;
using Accessibility.Infrastructure.Domain.Schedules;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Accessibility.Infrastructure
{
    public static class StartupSchedule
    {
        public static IServiceCollection AddSchedule(this IServiceCollection services)
        {
            return services
                .AddTransient<IScheduleRepository, ScheduleRepository>()
                .AddTransient<IScheduleQueryRepository, ScheduleQueryRepository>()
                .AddTransient<IAvailabilityQueryRepository, AvailabilityQueryRepository>()
                .AddTransient<ISchedulePeriodOfTimeChecker, SchedulePeriodOfTimeChecker>();
        }
    }
}
