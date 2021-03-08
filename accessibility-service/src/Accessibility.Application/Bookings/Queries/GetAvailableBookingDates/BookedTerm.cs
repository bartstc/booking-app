using System;

namespace Accessibility.Application.Bookings.Queries.GetAvailableBookingDates
{
    public class BookedTerm
    {
        public Guid EmployeeId { get; set; }
        public DateTime DateFrom { get; set; }
        public DateTime DateTo { get; set; }
    }
}
