using System.Collections.Generic;
using Accessibility.Domain.Bookings.BookedRecords;
using Core.Domain;

namespace Accessibility.Domain.Bookings.Events
{
    public class BookingCompletedEvent : DomainEventBase
    {
        public BookingCompletedEvent(PublicCustomerId customerId, IEnumerable<BookedRecord> bookedRecords)
        {
            CustomerId = customerId;
            BookedRecords = bookedRecords;
        }

        public PublicCustomerId CustomerId { get; }
        public IEnumerable<BookedRecord> BookedRecords { get; }
    }
}
