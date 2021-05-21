using Accessibility.Domain.SeedWork;
using Accessibility.Domain.SharedKernel;

namespace Accessibility.Domain.Bookings.Events
{
    public class BookingConfirmedEvent : DomainEventBase
    {
        public BookingConfirmedEvent(BookingId bookingId, FacilityId facilityId)
        {
            BookingId = bookingId;
            FacilityId = facilityId;
        }

        public BookingId BookingId { get; }
        public FacilityId FacilityId { get; }
    }
}
