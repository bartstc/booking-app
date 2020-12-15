using System.Threading;
using System.Threading.Tasks;
using Accessibility.Domain.Bookings;
using Accessibility.Domain.Bookings.BookedRecords;
using Accessibility.Domain.SeedWork;
using MediatR;

namespace Accessibility.Application.Bookings.SetBookedRecordStatus
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
