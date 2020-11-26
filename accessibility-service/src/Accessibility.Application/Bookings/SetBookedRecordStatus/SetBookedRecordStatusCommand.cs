using System;
using Accessibility.Domain.Bookings.BookingServices;
using MediatR;

namespace Accessibility.Application.Bookings.SetBookedRecordStatus
{
    public class SetBookedRecordStatusCommand : IRequest
    {
        public SetBookedRecordStatusCommand(Guid bookingId, Guid bookedRecordId, BookingServiceStatus status)
        {
            BookingId = bookingId;
            BookedRecordId = bookedRecordId;
            Status = status;
        }

        public Guid BookingId { get; }
        public Guid BookedRecordId { get; }
        public BookingServiceStatus Status { get; }
    }
}
