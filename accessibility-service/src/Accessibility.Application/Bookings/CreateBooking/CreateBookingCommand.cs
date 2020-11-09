using MediatR;

namespace Accessibility.Application.Bookings.CreateBooking
{
    public class CreateBookingCommand : IRequest<BookingIdDto>
    {
        public CreateBookingCommand(BookingDto booking)
        {
            this.Booking = booking;
        }

        public BookingDto Booking { get; }
    }
}