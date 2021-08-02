using System;
using Community.Domain.Members.ValueObjects;
using Core.Domain;

namespace Community.Domain.Members.Events
{
    public class BookingFulfilled : IEvent
    {
        public BookingFulfilled(BookingOffer offer, BookingFacility facility, BookingEmployee employee, DateTime date, short duration, Guid bookedRecordId)
        {
            Offer = offer;
            Facility = facility;
            Employee = employee;
            Date = date;
            Duration = duration;
            BookedRecordId = bookedRecordId;
        }

        public BookingOffer Offer { get; }
        public BookingFacility Facility { get; }
        public BookingEmployee Employee { get; }
        public DateTime Date { get; }
        public short Duration { get; }
        public Guid BookedRecordId { get; }
    }
}