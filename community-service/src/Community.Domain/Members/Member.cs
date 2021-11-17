using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Community.Domain.Members.Events;
using Community.Domain.Members.Rules;
using Community.Domain.Members.ValueObjects;
using Core.Domain;

namespace Community.Domain.Members
{
    public class Member : AggregateBase
    {
        public string FullName { get; private set; }
        public string Email { get; private set; }
        public string Phone { get; private set; }
        public DateTime? BirthDate { get; private set; }
        public Address Address { get; private set; }
        public ICollection<ArchivalBooking> ArchivalBookings { get; private set; }
        public bool Status { get; private set; }

        // for serialization
        public Member()
        {
            ArchivalBookings = new List<ArchivalBooking>();
        }

        public async Task InitializeNew(string fullName, string email, string phone, DateTime? birthDate, Address address,
            IMemberUniquenessChecker memberUniquenessChecker)
        {
            await CheckRuleAsync(new MemberEmailMustBeUniqueRule(email, memberUniquenessChecker));

            var @event = new MemberCreated(Guid.NewGuid(), fullName, email, phone, birthDate, address);

            Enqueue(@event);
            Apply(@event);          
        }

        public void Apply(MemberCreated @event)
        {
            Id = @event.Id;
            FullName = @event.FullName;
            Email = @event.Email;
            Phone = @event.Phone;
            BirthDate = @event.BirthDate;
            Address = @event.Address;
            ArchivalBookings = new List<ArchivalBooking>();
        }

        public void Activate()
        {
            var @event = new MemberActivated(Id, FullName, Email, Phone, BirthDate, Address);

            Enqueue(@event);
            Apply(@event);
        }

        private void Apply(MemberActivated @event)
        {
            Status = true;
        }

        public void AddFulfilledBooking(BookingOffer offer, BookingFacility facility, BookingEmployee employee, DateTime date, short duration, Guid bookedRecordId)
        {
            var @event = new BookingFulfilled(Id, offer, facility, employee, date, duration, bookedRecordId);

            Enqueue(@event);
            Apply(@event);
        }

        public void Apply(BookingFulfilled @event)
        {
            ArchivalBookings.Add(new ArchivalBooking(
                @event.Offer,
                @event.Facility,
                @event.Employee,
                @event.Date,
                @event.Duration,
                BookingStatus.Fulfilled,
                null,
                @event.BookedRecordId
            ));
        }

        public void AddCanceledBooking(BookingOffer offer, BookingFacility facility, BookingEmployee employee, DateTime date, short duration, Guid bookedRecordId)
        {
            var @event = new BookingCanceled(Id, offer, facility, employee, date, duration, bookedRecordId);

            Enqueue(@event);
            Apply(@event);
        }

        public void Apply(BookingCanceled @event)
        {
            ArchivalBookings.Add(new ArchivalBooking(
                @event.Offer,
                @event.Facility,
                @event.Employee,
                @event.Date,
                @event.Duration,
                BookingStatus.Canceled,
                null,
                @event.BookedRecordId
            ));
        }

        public void AddCanceledByFacilityBooking(BookingOffer offer, BookingFacility facility, BookingEmployee employee, DateTime date, short duration, Guid bookedRecordId, string caution)
        {
            var @event = new BookingCanceledByFacility(Id, offer, facility, employee, date, duration, bookedRecordId, caution);

            Enqueue(@event);
            Apply(@event);
        }

        public void Apply(BookingCanceledByFacility @event)
        {
            ArchivalBookings.Add(new ArchivalBooking(
                @event.Offer,
                @event.Facility,
                @event.Employee,
                @event.Date,
                @event.Duration,
                BookingStatus.CanceledByFacility,
                @event.Caution,
                @event.BookedRecordId
            ));
        }

        public void AddNotRealizedBooking(BookingOffer offer, BookingFacility facility, BookingEmployee employee, DateTime date, short duration, Guid bookedRecordId, string caution)
        {
            var @event = new BookingNotRealized(Id, offer, facility, employee, date, duration, bookedRecordId, caution);

            Enqueue(@event);
            Apply(@event);
        }

        public void Apply(BookingNotRealized @event)
        {
            ArchivalBookings.Add(new ArchivalBooking(
                @event.Offer,
                @event.Facility,
                @event.Employee,
                @event.Date,
                @event.Duration,
                BookingStatus.CanceledByFacility,
                @event.Caution,
                @event.BookedRecordId
            ));
        }
    }
}
