using System;
using System.Collections.Generic;
using MediatR;

namespace Booking.Application.Bookings.GetBookedRecordsOfFacility
{
    public class GetBookedRecordsOfFacilityQuery : IRequest<List<BookedRecordOfFacilityDto>>
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
