using System;

namespace Accessibility.Application.Bookings
{
    public class BookingDto
    {
        public Guid EmployeeId { get; set; }
        public Guid CustomerId { get; set; }
        public Guid OfferId { get; set; }
        public MoneyDto Price { get; set; }
        public DateTime Date { get; set; }
    }
}