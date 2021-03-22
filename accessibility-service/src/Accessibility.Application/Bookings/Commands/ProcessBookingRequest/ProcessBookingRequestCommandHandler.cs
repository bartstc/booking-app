using System.Threading;
using System.Threading.Tasks;
using Accessibility.Domain.Bookings;
using Accessibility.Domain.SeedWork;
using MediatR;

namespace Accessibility.Application.Bookings.Commands.ProcessBookingRequest
{
    public class ProcessBookingRequestCommandHandler : IRequestHandler<ProcessBookingRequestCommand, BookingId>
    {
        private readonly IBookingRepository repository;
        private readonly IUnitOfWork unitOfWork;

        public ProcessBookingRequestCommandHandler(IBookingRepository repository, IUnitOfWork unitOfWork)
        {
            this.repository = repository;
            this.unitOfWork = unitOfWork;
        }

        public async Task<BookingId> Handle(ProcessBookingRequestCommand request, CancellationToken cancellationToken)
        {
            var booking = await repository.GetByIdAsync(request.BookingId, request.FacilityId);
            booking.SetBooked();
            await unitOfWork.CommitAsync();
            return booking.Id;
        }
    }
}
