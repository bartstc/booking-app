using System;
using Accessibility.Domain.SeedWork;

namespace Accessibility.Domain.Bookings
{
    public class BookingCreatedEvent : DomainEventBase
    {
        public BookingCreatedEvent(OfferId offerId, CustomerId customerId, DateTime date) 
        {
            this.Date = date;
            this.OfferId = offerId;
            this.CustomerId = customerId;
               
        }

        public OfferId OfferId { get; }
        public CustomerId CustomerId { get; }
        public DateTime Date { get; }
    }
}