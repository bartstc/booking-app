using System;

namespace Accessibility.Application.Bookings.Queries.GetAvailableBookingTerms
{
    public class BookedTerm
    {
        public Guid EmployeeId { get; set; }
        public DateTime DateFrom { get; set; }
        public DateTime DateTo { get; set; }
    }
}
