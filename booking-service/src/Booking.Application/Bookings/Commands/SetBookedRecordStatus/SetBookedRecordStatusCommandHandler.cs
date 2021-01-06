using System.Threading;
using System.Threading.Tasks;
using Booking.Domain.Bookings;
using Booking.Domain.Bookings.BookedRecords;
using Booking.Domain.SeedWork;
using MediatR;

namespace Booking.Application.Bookings.Commands.SetBookedRecordStatus
{
    public class SetBookedRecordStatusCommandHandler : IRequestHandler<SetBookedRecordStatusCommand>
    {
        private readonly IBookingRepository repo;
        private readonly IUnitOfWork unitOfWork;

        public SetBookedRecordStatusCommandHandler(IBookingRepository repo, IUnitOfWork unitOfWork)
        {
            this.repo = repo;
            this.unitOfWork = unitOfWork;
        }

        public async Task<Unit> Handle(SetBookedRecordStatusCommand request, CancellationToken cancellationToken)
        {
            var booking = await repo.GetByIdAsync(new BookingId(request.BookingId));

            booking.ChangeRecordStatus(new BookedRecordId(request.BookedRecordId), request.Status);

            await unitOfWork.CommitAsync();

            return Unit.Value;
        }
    }
}
