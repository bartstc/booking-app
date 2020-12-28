using System;
using Booking.Domain.Bookings.BookedRecords;
using MediatR;

namespace Booking.Application.Bookings.SetBookedRecordStatus
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
