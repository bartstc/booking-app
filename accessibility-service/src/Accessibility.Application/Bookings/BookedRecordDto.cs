using System;

namespace Accessibility.Application.Bookings
{
    public class BookedRecordDto
    {
        public Guid EmployeeId { get; set; }
        public Guid OfferId { get; set; }
        public DateTime Date { get; set; }
    }
}