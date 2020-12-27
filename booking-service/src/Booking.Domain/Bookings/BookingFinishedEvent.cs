using Booking.Domain.SeedWork;

namespace Booking.Domain.Bookings
{
    public class BookingFinishedEvent : DomainEventBase
    {
        public BookingFinishedEvent(BookingId id)
        {
            Id = id;
        }

        public BookingId Id { get; }
    }
}
