using System.Threading;
using System.Threading.Tasks;
using Accessibility.Domain.Bookings;
using Core.Commands;
using MediatR;

namespace Accessibility.Application.Bookings.Commands.ArchiveCompletedBookings
{
    public class ArchiveCompletedBookingsCommandHandler : ICommandHandler<ArchiveCompletedBookingsCommand>
    {
        private readonly IBookingRepository bookingRepository;

        public ArchiveCompletedBookingsCommandHandler(IBookingRepository bookingRepository)
        {
            this.bookingRepository = bookingRepository;
        }
        
        public async Task<Unit> Handle(ArchiveCompletedBookingsCommand request, CancellationToken cancellationToken)
        {
            var completedBookings = await bookingRepository.GetAllCompletedAsync();

            foreach (var booking in completedBookings)
            {
                booking.Archive();
                bookingRepository.DeleteAsync(booking);
            }

            return Unit.Value;
        }
    }
}
