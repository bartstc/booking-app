using System;
using Booking.Domain.SharedKernel;

namespace Booking.Domain.Bookings.BookedRecords
{
    public class BookedRecordData
    {
        public BookedRecordData(EmployeeId employeeId, OfferId offerId, Money price, DateTime date, short durationInMinutes)
        {
            EmployeeId = employeeId;
            OfferId = offerId;
            Price = price;
            Date = date;
            DurationInMinutes = durationInMinutes;
        }

        public EmployeeId EmployeeId { get; }
        public OfferId OfferId { get; }
        public Money Price { get; }
        public DateTime Date { get; }
        public short DurationInMinutes { get; }
    }
}
