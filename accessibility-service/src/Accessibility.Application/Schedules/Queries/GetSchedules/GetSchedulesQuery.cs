using System;
using System.Collections.Generic;
using MediatR;

namespace Accessibility.Application.Schedules.Queries.GetSchedules
{
    public class GetSchedulesQuery : IRequest<IEnumerable<ScheduleDto>>
    {
        public GetSchedulesQuery(Guid facilityId, DateTime? dateFrom, DateTime? dateTo)
        {
            FacilityId = facilityId;
            DateFrom = dateFrom;
            DateTo = dateTo;
        }

        public Guid FacilityId { get; }
        public DateTime? DateFrom { get; }
        public DateTime? DateTo { get; }
    }
}
