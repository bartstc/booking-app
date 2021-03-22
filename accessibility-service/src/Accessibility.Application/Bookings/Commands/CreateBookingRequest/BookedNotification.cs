using Accessibility.Application.Configuration.DomainEvents;
using Accessibility.Domain.Bookings;
using Accessibility.Domain.Bookings.BookedRecords;
using Accessibility.Domain.SharedKernel;
using Newtonsoft.Json;

namespace Accessibility.Application.Bookings.Commands.CreateBookingRequest
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