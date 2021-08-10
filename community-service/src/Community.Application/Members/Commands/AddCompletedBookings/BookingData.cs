using System;
using Community.Domain.Members.ValueObjects;

namespace Community.Application.Members.Commands.AddCompletedBookings
{
    public class BookingData
    {
        public Guid OfferId { get; private set; }
        public string OfferName { get; private set; }
        public Guid FacilityId { get; private set; }
        public string FacilityName { get; private set; }
        public Guid EmployeeId { get; private set; }
        public string EmployeeName { get; private set; }
        public DateTime Date { get; private set; }
        public short Duration { get; private set; }
        public Guid BookedRecordId { get; private set; }
        public BookingStatus Status { get; private set; }
        public string Caution { get; set; }
    }
}
