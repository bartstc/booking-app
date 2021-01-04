using System.Collections.Generic;
using Booking.Domain.Bookings;
using Booking.Domain.SharedKernel;

namespace Booking.Application.Bookings.EventBus.ProcessingBookingOrder
{
    public class ProcessBookingOrder
    {
        public ProcessBookingOrder(FacilityId facilityId, CustomerId customerId, List<BookedRecord> bookedRecords)
        {
            FacilityId = facilityId;
            CustomerId = customerId;
            BookedRecords = bookedRecords;
        }

        public FacilityId FacilityId { get; }
        public CustomerId CustomerId { get; }
        public List<BookedRecord> BookedRecords { get; }
    }
}
