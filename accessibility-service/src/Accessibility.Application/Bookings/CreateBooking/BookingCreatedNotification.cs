using System;
using Accessibility.Application.Configuration.DomainEvents;
using Accessibility.Domain.Bookings;

namespace Accessibility.Application.Bookings.CreateBooking
{
    public class BookingCreatedNotification : DomainNotificationBase<BookingCreatedEvent>
    {
        public BookingCreatedNotification(BookingCreatedEvent domainEvent) : base(domainEvent)
        {
            OfferId = domainEvent.OfferId;
            CustomerId = domainEvent.CustomerId;
            Date = domainEvent.Date;
        }

        public OfferId OfferId { get; }
        public CustomerId CustomerId { get; }
        public DateTime Date { get; }
    }
}