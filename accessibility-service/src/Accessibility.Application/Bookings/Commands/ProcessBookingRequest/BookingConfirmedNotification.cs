using System.Text.Json.Serialization;
using Accessibility.Domain.Bookings;
using Accessibility.Domain.Bookings.Events;
using Accessibility.Domain.SharedKernel;
using Core.DomainEvents;

namespace Accessibility.Application.Bookings.Commands.ProcessBookingRequest
{
    public class BookingConfirmedNotification : DomainNotificationBase<BookingConfirmedEvent>
    {
        public BookingConfirmedNotification(BookingConfirmedEvent domainEvent) : base(domainEvent)
        {
            BookingId = domainEvent.BookingId;
            FacilityId = domainEvent.FacilityId;
        }

        [JsonConstructor]
        public BookingConfirmedNotification(BookingId bookingId, FacilityId facilityId) : base(null)
        {
            BookingId = bookingId;
            FacilityId = facilityId;
        }

        public BookingId BookingId { get; }
        public FacilityId FacilityId { get; }
    }
}
