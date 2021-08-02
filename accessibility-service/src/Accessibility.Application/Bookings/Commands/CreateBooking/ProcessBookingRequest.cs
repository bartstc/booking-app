using Accessibility.Application.Bookings.Commands.CreateBooking;

namespace Accessibility.Application.Bookings.Commands.CreateBookingRequest
{
    public class ProcessBookingRequest
    {
        public ProcessBookingRequest(CreateBookingCommand command)
        {
            Command = command;
        }

        public CreateBookingCommand Command { get; }
    }

    public interface BookingRequestProcessingResult
    {
        bool IsBooked { get; }
    }
}
