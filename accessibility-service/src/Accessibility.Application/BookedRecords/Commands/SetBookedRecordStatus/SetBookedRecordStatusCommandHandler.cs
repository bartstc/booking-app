using System.Threading;
using System.Threading.Tasks;
using Accessibility.Domain.Bookings;
using Accessibility.Domain.Bookings.BookedRecords;
using Accessibility.Domain.SharedKernel;
using Core.Commands;
using MediatR;

namespace Accessibility.Application.BookedRecords.Commands.SetBookedRecordStatus
{
    public class SetBookedRecordStatusCommandHandler : ICommandHandler<SetBookedRecordStatusCommand>
    {
        private readonly IBookingRepository bookingRepository;

        public SetBookedRecordStatusCommandHandler(IBookingRepository bookingRepository)
        {
            this.bookingRepository = bookingRepository;
        }

        public async Task<Unit> Handle(SetBookedRecordStatusCommand request, CancellationToken cancellationToken)
        {
            var booking = await bookingRepository.GetByIdAsync(new BookingId(request.BookingId), new FacilityId(request.FacilityId));

            booking.ChangeRecordStatus(
                new BookedRecordId(request.BookedRecordId),
                request.Status,
                request.Caution);

            return Unit.Value;
        }
    }
}
