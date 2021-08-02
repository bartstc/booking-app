using System.Collections.Generic;
using Accessibility.Domain.Bookings.BookedRecords;
using Core.Domain;

namespace Accessibility.Domain.Bookings.Events
{
    public class BookingArchivedEvent : DomainEventBase
    {
        public BookingArchivedEvent(PublicCustomerId customerId, IEnumerable<ArchivedBookedRecord> bookedRecords)
        {
            CustomerId = customerId;
            BookedRecords = bookedRecords;
        }

        public PublicCustomerId CustomerId { get; }
        public IEnumerable<ArchivedBookedRecord> BookedRecords { get; }
    }
}
