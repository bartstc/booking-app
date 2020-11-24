using Accessibility.Domain.SeedWork;

namespace Accessibility.Domain.Bookings.BookingServices
{
    public class BookedEvent : DomainEventBase
    {
        public BookedEvent(BookingServiceId bookingServiceId, CustomerId customerId, FacilityId facilityId, OfferId offerId) 
        {
            BookingServiceId = bookingServiceId;
            CustomerId = customerId;
            FacilityId = facilityId;
            OfferId = offerId;
        }

        public BookingServiceId BookingServiceId { get; }
        public CustomerId CustomerId { get; }
        public FacilityId FacilityId { get; }
        public OfferId OfferId { get; }
    }
}