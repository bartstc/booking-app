using System;
using Core.Queries;

namespace Accessibility.Application.Schedules.Queries.GetSchedules
{
    public class GetSchedulesQuery : IQuery<QueryCollectionResult<ScheduleDto>>
    {
        public GetSchedulesQuery(Guid facilityId, GetSchedulesQueryParams @params)
        {
            FacilityId = facilityId;
            Params = @params;
        }

        public Guid FacilityId { get; }
        public GetSchedulesQueryParams Params { get; }
    }
}
