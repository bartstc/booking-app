using System;
using Core.Queries;

namespace Accessibility.Application.Availabilities.Queries.GetAvailabilites
{
    public class GetAvailabilitiesQueryParams : QueryParams
    {
        public DateTime? StartTime { get; set; }
        public DateTime? EndTime { get; set; }
        public Guid EmpleyeeId { get; set; }
    }
}
