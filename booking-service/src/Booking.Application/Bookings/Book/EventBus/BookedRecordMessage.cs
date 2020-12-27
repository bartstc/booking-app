using System;
using Booking.Domain.Bookings.BookedRecords;
using Booking.Domain.SharedKernel;

namespace Booking.Application.Bookings.Book.EventBus
{
    public class BookedRecordMessage
    {
        public BookedRecordMessage(EmployeeId employeeId, OfferId offerId, DateTime date)
        {
            EmployeeId = employeeId;
            OfferId = offerId;
            Date = date;
        }

        public EmployeeId EmployeeId { get; }
        public OfferId OfferId { get; }
        public DateTime Date { get; }
    }
}
