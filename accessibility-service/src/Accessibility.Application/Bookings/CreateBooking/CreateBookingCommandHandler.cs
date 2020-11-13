using System.Threading;
using System.Threading.Tasks;
using Accessibility.Domain.Bookings;
using Accessibility.Domain.SharedKernel;
using MediatR;

namespace Accessibility.Application.Bookings.CreateBooking
{
    public class CreateBookingCommandHandler : IRequestHandler<CreateBookingCommand, BookingIdDto>
    {
        private readonly IBookingRepository repo;

        public CreateBookingCommandHandler(IBookingRepository repo)
        {
            this.repo = repo;
        }

        public async Task<BookingIdDto> Handle(CreateBookingCommand request, CancellationToken cancellationToken)
        {
            var reqBooking = request.Booking;
            var booking = new Booking(
                new EmployeeId(reqBooking.EmployeeId),
                new CustomerId(reqBooking.CustomerId),
                new OfferId(reqBooking.OfferId),
                Money.Of(reqBooking.Price.Value, reqBooking.Price.Currency),
                reqBooking.Date);

            await repo.AddAsync(booking);

            await repo.CommitAsync();

            return new BookingIdDto { Id = booking.Id.Value };
        }
    }
}