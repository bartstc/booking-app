using System;
using System.Collections.Generic;
using ExternalEvents.Accessibility.Bookings.Dtos;

namespace ExternalEvents.Accessibility.Bookings
{
    public class BookingCompleted
    {
        public BookingCompleted(Guid publicCustomerId, IEnumerable<BookedRecord> bookedRecords)
        {
            PublicCustomerId = publicCustomerId;
            BookedRecords = bookedRecords;
        }

        public Guid PublicCustomerId { get; }
        public IEnumerable<BookedRecord> BookedRecords { get; }
    }

    public class BookedRecord
    {
        public BookedRecord(Offer offer, Facility facility, Employee employee, DateTime date, short duration, Guid bookedRecordId, BookedRecordStatus status, string caution)
        {
            Offer = offer;
            Facility = facility;
            Employee = employee;
            Date = date;
            Duration = duration;
            BookedRecordId = bookedRecordId;
            Status = status;
            Caution = caution;
        }

        public Offer Offer { get; }
        public Facility Facility { get; }
        public Employee Employee { get; }
        public DateTime Date { get; }
        public short Duration { get; }
        public Guid BookedRecordId { get; }
        public BookedRecordStatus Status { get; }
        public string Caution { get; }
    }

    public enum BookedRecordStatus
    {
        Fulfilled,
        CanceledByClient,
        CanceledByFacility,
        NotRealized
    }
}
