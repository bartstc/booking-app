using System;
using System.Collections.Generic;
using Core.Queries;

namespace Accessibility.Application.Bookings.Queries.GetBookedRecordsOfFacility
{
    public class GetBookedRecordsOfFacilityQuery : IQuery<List<BookedRecordOfFacilityDto>>
    {
        public GetBookedRecordsOfFacilityQuery(Guid facilityId, DateTime dateFrom, DateTime dateTo)
        {
            FacilityId = facilityId;
            DateFrom = dateFrom;
            DateTo = dateTo;
        }

        public Guid FacilityId { get; set; }
        public DateTime DateFrom { get; set; }
        public DateTime DateTo { get; set; }
    }
}
