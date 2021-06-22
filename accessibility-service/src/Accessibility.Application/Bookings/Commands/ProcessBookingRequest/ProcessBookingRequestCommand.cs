using Accessibility.Domain.Bookings;
using Accessibility.Domain.SharedKernel;
using Core.Commands;

namespace Accessibility.Application.Bookings.Commands.ProcessBookingRequest
{
    public class ProcessBookingRequestCommand : ICommand
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
