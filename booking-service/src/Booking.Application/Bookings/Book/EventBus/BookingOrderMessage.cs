using System.Collections.Generic;
using Booking.Domain.Bookings;

namespace Booking.Application.Bookings.Book.EventBus
{
    public class BookingOrderMessage
    {
        public BookingOrderMessage(CustomerId customerId, List<BookedRecordMessage> bookedRecords)
        {
            CustomerId = customerId;
            BookedRecords = bookedRecords;
        }

        public CustomerId CustomerId { get; }
        public List<BookedRecordMessage> BookedRecords { get; }
    }
}
