using System;
using Accessibility.Domain.Bookings.BookedRecords;
using MediatR;

namespace Accessibility.Application.Bookings.Commands.SetBookedRecordStatus
{
    public class SetBookedRecordStatusCommand : IRequest
    {
        public SetBookedRecordStatusCommand(Guid bookingId, Guid bookedRecordId, BookedRecordStatus status)
        {
            BookingId = bookingId;
            BookedRecordId = bookedRecordId;
            Status = status;
        }

        public Guid BookingId { get; }
        public Guid BookedRecordId { get; }
        public BookedRecordStatus Status { get; }
    }
}
