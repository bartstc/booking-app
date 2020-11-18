using System;
using Accessibility.Application.Configuration.DomainEvents;
using Accessibility.Domain.Bookings;
using Newtonsoft.Json;

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

        [JsonConstructor]
        public BookingCreatedNotification(OfferId offerId, CustomerId customerId, DateTime date) : base(null)
        {
            OfferId = offerId;
            CustomerId = customerId;
            Date = date;
        }

        public OfferId OfferId { get; }
        public CustomerId CustomerId { get; }
        public DateTime Date { get; }
    }
}