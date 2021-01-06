using System.Text.Json.Serialization;
using Booking.Application.Configuration.DomainEvents;
using Booking.Domain.Bookings;
using Booking.Domain.Bookings.BookedRecords;
using Booking.Domain.SharedKernel;

namespace Booking.Application.Bookings.Commands.CreateBookingOrder
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