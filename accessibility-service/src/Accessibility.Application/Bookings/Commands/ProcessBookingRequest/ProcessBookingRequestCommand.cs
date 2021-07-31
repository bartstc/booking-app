using Accessibility.Application.Bookings.Commands.CreateBooking;
using Core.Commands;

namespace Accessibility.Application.Bookings.Commands.ProcessBookingRequest
{
    public record ProcessBookingRequestCommand(
        CreateBookingCommand Command
    ) : ICommand;
}
