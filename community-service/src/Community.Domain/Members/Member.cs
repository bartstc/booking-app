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

        public void AddFulfilledBooking(BookingOffer offer, BookingFacility facility, BookingEmployee employee, DateTime date, short duration, Guid bookedRecordId)
        {
            var @event = new BookingFulfilled(offer, facility, employee, date, duration, bookedRecordId);

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
    }
}
