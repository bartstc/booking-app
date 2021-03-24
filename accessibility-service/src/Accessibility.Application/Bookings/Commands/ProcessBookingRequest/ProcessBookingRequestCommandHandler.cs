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
        private readonly IBookingPeriodOfTimeChecker checker;

        public ProcessBookingRequestCommandHandler(IBookingRepository repository, IUnitOfWork unitOfWork, IBookingPeriodOfTimeChecker checker)
        {
            this.repository = repository;
            this.unitOfWork = unitOfWork;
            this.checker = checker;
        }

        public async Task<BookingId> Handle(ProcessBookingRequestCommand request, CancellationToken cancellationToken)
        {            
            var booking = await repository.GetByIdAsync(request.BookingId, request.FacilityId);
            await booking.SetBooked(checker);
            await unitOfWork.CommitAsync();
            return booking.Id;
        }
    }
}
