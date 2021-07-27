using System;
using ExternalEvents.Accessibility.BookingRecords.Dtos;

namespace ExternalEvents.Accessibility.BookingRecords
{
    public class BookingRecordNotRealized
    {
        public BookingRecordNotRealized(Guid customerId, Offer offer, Facility facility, Employee employee, DateTime date, short duration, string caution, Guid bookedRecordId)
        {
            CustomerId = customerId;
            Offer = offer;
            Facility = facility;
            Employee = employee;
            Date = date;
            Duration = duration;
            Caution = caution;
            BookedRecordId = bookedRecordId;
        }

        public Guid CustomerId { get; }
        public Offer Offer { get; }
        public Facility Facility { get; }
        public Employee Employee { get; }
        public DateTime Date { get; }
        public short Duration { get; }
        public string Caution { get; }
        public Guid BookedRecordId { get; }
    }
}
