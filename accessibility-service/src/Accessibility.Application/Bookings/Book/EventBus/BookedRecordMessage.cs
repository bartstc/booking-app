using System;
using Accessibility.Domain.Bookings.BookedRecords;
using Accessibility.Domain.SharedKernel;

namespace Accessibility.Application.Bookings.Book.EventBus
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
