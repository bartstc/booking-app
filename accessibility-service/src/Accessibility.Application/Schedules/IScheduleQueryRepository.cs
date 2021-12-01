using System;
using System.Threading.Tasks;
using Accessibility.Application.Schedules.Queries;
using Accessibility.Application.Schedules.Queries.GetSchedules;
using Core.Queries;

namespace Accessibility.Application.Schedules
{
    public interface IScheduleQueryRepository
    {
        Task<QueryCollectionResult<ScheduleDto>> GetSchedules(Guid facilityId, GetSchedulesQueryParams @params);
    }
}
