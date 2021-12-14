using System;

namespace Accessibility.Application.BookedRecords.Queries
{
    public class BookedRecordDto
    {
        public Guid BookingId { get; }
        public Guid BookedRecordId { get; }
        public Guid OfferId { get; }
        public string OfferName { get; }
        public Guid EmployeeId { get; }
        public string EmployeeName { get; }
        public Guid CustomerId { get; }
        public Guid FacilityId { get; }
        public DateTime DateFrom { get; }
        public DateTime DateTo { get; }
        public short Duration { get; }
        public short Status { get; }
        public decimal Price { get; }
        public string Currency { get; }
    }
}
