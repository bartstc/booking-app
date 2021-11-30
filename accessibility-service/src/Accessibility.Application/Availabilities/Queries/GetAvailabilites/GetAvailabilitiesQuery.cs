using System;
using Core.Queries;

namespace Accessibility.Application.Availabilities.Queries.GetAvailabilites
{
    public class GetAvailabilitiesQuery : IQuery<QueryCollectionResult<AvailabilityDto>>
    {
        public GetAvailabilitiesQuery(Guid facilityId, Guid scheduleId, GetAvailabilitiesQueryParams @params)
        {
            FacilityId = facilityId;
            ScheduleId = scheduleId;
            Params = @params;
        }

        public Guid FacilityId { get; }
        public Guid ScheduleId { get; }
        public GetAvailabilitiesQueryParams Params { get; }
    }
}
