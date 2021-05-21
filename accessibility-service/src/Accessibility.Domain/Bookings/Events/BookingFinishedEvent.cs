using Accessibility.Domain.SeedWork;

namespace Accessibility.Domain.Bookings.Events
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
