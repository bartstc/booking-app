using System;

namespace Booking.Application.Bookings.Queries.GetBookedRecordsOfFacility
{
    public class BookedRecordOfFacilityDto
    {
        public Guid BookingId { get; set; }
        public Guid OfferId { get; set; }
        public string OfferName { get; set; }
        public Guid EmployeeId { get; set; }
        public string EmployeeName { get; set; }
        public Guid CustomerId { get; set; }
        public DateTime DateFrom { get; set; }
        public DateTime DateTo { get; set; }
        public short Duration { get; set; }
        public short Status { get; set; }
        public decimal Price { get; set; }
        public string Currency { get; set; }
    }
}
