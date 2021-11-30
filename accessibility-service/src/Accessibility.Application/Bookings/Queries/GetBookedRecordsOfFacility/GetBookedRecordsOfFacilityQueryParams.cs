using System;
using Core.Queries;

namespace Accessibility.Application.Bookings.Queries.GetBookedRecordsOfFacility
{
    public class GetBookedRecordsOfFacilityQueryParams : QueryParams
    {
        public DateTime DateFrom { get; set; }
        public DateTime DateTo { get; set; }
    }
}
