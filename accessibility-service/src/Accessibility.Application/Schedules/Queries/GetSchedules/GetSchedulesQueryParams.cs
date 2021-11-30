using System;
using Core.Queries;

namespace Accessibility.Application.Schedules.Queries.GetSchedules
{
    public class GetSchedulesQueryParams : QueryParams
    {
        public DateTime? DateFrom { get; set; }
        public DateTime? DateTo { get; set; }
    }
}
