using System;
using Accessibility.Domain.Bookings;
using Accessibility.Domain.SharedKernel;
using MediatR;

namespace Accessibility.Application.Bookings.Commands.ProcessBookingRequest
{
    public class ProcessBookingRequestCommand : IRequest<BookingId>
    {
        public ProcessBookingRequestCommand(BookingId bookingId, FacilityId facilityId)
        {
            BookingId = bookingId;
            FacilityId = facilityId;
        }

        public BookingId BookingId { get; }
        public FacilityId FacilityId { get; }
    }
}
