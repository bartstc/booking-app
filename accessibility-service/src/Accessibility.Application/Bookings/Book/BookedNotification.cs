using Accessibility.Application.Configuration.DomainEvents;
using Accessibility.Domain.Bookings;
using Accessibility.Domain.Bookings.BookingServices;
using Newtonsoft.Json;

namespace Accessibility.Application.Bookings.Book
{
    public class BookedNotification : DomainNotificationBase<BookedEvent>
    {
        public BookedNotification(BookedEvent domainEvent) : base(domainEvent)
        {
            CustomerId = domainEvent.CustomerId;
            FacilityId = domainEvent.FacilityId;
            OfferId = domainEvent.OfferId;
        }

        [JsonConstructor]
        public BookedNotification(CustomerId customerId, FacilityId facilityId, OfferId offerId) : base(null)
        {
            CustomerId = customerId;
            FacilityId = facilityId;
            OfferId = offerId;
        }

        public CustomerId CustomerId { get; }
        public FacilityId FacilityId { get; }
        public OfferId OfferId { get; }
    }
}