using Accessibility.Domain.Bookings;
using Accessibility.Domain.SharedKernel;

namespace Accessibility.Application.Bookings.IntegrationEvents.Events
{
    public class BookingRequested
    {
        public BookingRequested(FacilityId facilityId, BookingId bookingId)
        {
            FacilityId = facilityId;
            BookingId = bookingId;
        }

        public FacilityId FacilityId { get; }
        public BookingId BookingId { get; }
    }
}
