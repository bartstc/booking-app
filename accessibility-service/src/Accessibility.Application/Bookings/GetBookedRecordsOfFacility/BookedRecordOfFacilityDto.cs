using System;

namespace Accessibility.Application.Bookings.GetBookedRecordsOfFacility
{
    public class BookedRecordOfFacilityDto
    {
        public Guid BookingId { get; set; }
        public Guid EmployeeId { get; set; }
        public Guid OfferId { get; set; }
        public decimal Price { get; set; }
        public string Currency { get; set; }
        public short Status { get; set; }
        public DateTime Date { get; set; }
        public short Duration { get; set; }
    }
}
