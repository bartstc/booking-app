using System.Collections.Generic;
using System.Linq;
using Accessibility.Domain.Bookings;
using Accessibility.Domain.Bookings.BookedRecords;
using Accessibility.Domain.Bookings.Events;
using Core.DomainEvents;
using Newtonsoft.Json;

namespace Accessibility.Application.Bookings.Commands.ArchiveCompletedBookings
{
    public class BookingArchivedNotification : DomainNotificationBase<BookingArchivedEvent>
    {
        public BookingArchivedNotification(BookingArchivedEvent domainEvent) : base(domainEvent)
        {
            CustomerId = domainEvent.CustomerId;
            BookedRecords = domainEvent.BookedRecords.ToList();
        }

        [JsonConstructor]
        public BookingArchivedNotification(PublicCustomerId customerId, List<ArchivedBookedRecord> bookedRecords) : base(null)
        {
            CustomerId = customerId;
            BookedRecords = bookedRecords;
        }

        public PublicCustomerId CustomerId { get; set; }
        public List<ArchivedBookedRecord> BookedRecords { get; set; }
    }
}
