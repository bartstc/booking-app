using System;
using System.Collections.Generic;
using Core.Domain;

namespace Community.Domain.Members.ValueObjects
{
    public class ArchivalBooking : ValueObject
    {
        public ArchivalBooking(BookingOffer offer, BookingFacility facility, BookingEmployee employee, DateTime date, short duration, BookingStatus status, string caution, Guid bookedRecordId)
        {
            Offer = offer;
            Facility = facility;
            Employee = employee;
            Date = date;
            Duration = duration;
            Status = status;
            Caution = caution;
            BookedRecordId = bookedRecordId;
        }

        public BookingOffer Offer { get; }
        public BookingFacility Facility { get; }
        public BookingEmployee Employee { get; }
        public DateTime Date { get; }
        public short Duration { get; }
        public BookingStatus Status { get; }
        public string Caution { get; }
        public Guid BookedRecordId { get; }

        protected override IEnumerable<object> GetEqualityComponents()
        {
            throw new NotImplementedException();
        }
    }

    public enum BookingStatus
    {
        Fulfilled,
        Canceled,
        CanceledByFacility,
        NotRealized
    }
}
