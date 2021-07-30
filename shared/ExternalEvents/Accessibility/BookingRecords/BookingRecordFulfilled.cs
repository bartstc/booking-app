using System;
using ExternalEvents.Accessibility.BookingRecords.Dtos;

namespace ExternalEvents.Accessibility.BookingRecords
{
    public class BookingRecordFulfilled
    {
        public BookingRecordFulfilled(Guid publicCustomerId, Offer offer, Facility facility, Employee employee, DateTime date, short duration, Guid bookedRecordId)
        {
            PublicCustomerId = publicCustomerId;
            Offer = offer;
            Facility = facility;
            Employee = employee;
            Date = date;
            Duration = duration;
            BookedRecordId = bookedRecordId;
        }

        public Guid PublicCustomerId { get; }
        public Offer Offer { get; }
        public Facility Facility { get; }
        public Employee Employee { get; }
        public DateTime Date { get; }
        public short Duration { get; }
        public Guid BookedRecordId { get; }
    }
}
