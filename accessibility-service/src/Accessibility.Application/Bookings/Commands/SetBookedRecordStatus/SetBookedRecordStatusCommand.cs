using System;
using Accessibility.Domain.Bookings.BookedRecords;
using MediatR;

namespace Accessibility.Application.Bookings.Commands.SetBookedRecordStatus
{
    public class SetBookedRecordStatusCommand : IRequest
    {
        public SetBookedRecordStatusCommand(Guid bookingId, Guid facilityId, Guid bookedRecordId, BookedRecordStatus status)
        {
            BookingId = bookingId;
            FacilityId = facilityId;
            BookedRecordId = bookedRecordId;
            Status = status;
        }

        public Guid BookingId { get; }
        public Guid FacilityId { get; }
        public Guid BookedRecordId { get; }
        public BookedRecordStatus Status { get; }
    }
}
