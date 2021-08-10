using System;
using System.Collections.Generic;
using Community.Domain.Members.Events;
using Community.Domain.Members.ValueObjects;
using Marten.Events.Aggregation;

namespace Community.Infrastructure.Application.Members.Projections
{
    public class MemberArchivalBookings
    {        
        public Guid Id { get; set; }
        public List<ArchivalBooking> ArchivalBookings { get; set; }
    }

    public class MemberArchivalBookingsProjection : AggregateProjection<MemberArchivalBookings>
    {
        public void Apply(MemberCreated @event, MemberArchivalBookings view)
        {
            view.Id = @event.Id;
            view.ArchivalBookings = new List<ArchivalBooking>();
        }

        public void Apply(BookingFulfilled @event, MemberArchivalBookings view)
        {
            view.ArchivalBookings.Add(new ArchivalBooking(
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

        public void Apply(BookingCanceled @event, MemberArchivalBookings view)
        {
            view.ArchivalBookings.Add(new ArchivalBooking(
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

        public void Apply(BookingCanceledByFacility @event, MemberArchivalBookings view)
        {
            view.ArchivalBookings.Add(new ArchivalBooking(
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

        public void Apply(BookingNotRealized @event, MemberArchivalBookings view)
        {
            view.ArchivalBookings.Add(new ArchivalBooking(
                @event.Offer,
                @event.Facility,
                @event.Employee,
                @event.Date,
                @event.Duration,
                BookingStatus.NotRealized,
                @event.Caution,
                @event.BookedRecordId
            ));
        }
    }
}
