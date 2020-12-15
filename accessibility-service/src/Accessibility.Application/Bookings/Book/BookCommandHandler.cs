using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Accessibility.Domain.Bookings;
using Accessibility.Domain.Bookings.BookedRecords;
using Accessibility.Domain.SeedWork;
using Accessibility.Domain.SharedKernel;
using MediatR;

namespace Accessibility.Application.Bookings.Book
{
    public class BookCommandHandler : IRequestHandler<BookCommand, BookingIdDto>
    {
        private readonly IBookingRepository repo;
        private readonly IUnitOfWork unitOfWork;

        public BookCommandHandler(IBookingRepository repo, IUnitOfWork unitOfWork)
        {
            this.repo = repo;
            this.unitOfWork = unitOfWork;
        }

        public async Task<BookingIdDto> Handle(BookCommand request, CancellationToken cancellationToken)
        {
            var booking = Booking.CreateBooked(
                new CustomerId(request.CustomerId),
                new FacilityId(request.FacilityId),
                request.BookingServices.Select(s => new BookedRecordData(
                    new EmployeeId(s.EmployeeId),
                    new OfferId(s.OfferId),
                    Money.Of(50, "PLN"),
                    s.Date,
                    60
                )).ToList()
            );

            await repo.AddAsync(booking);

            await unitOfWork.CommitAsync(cancellationToken);

            return new BookingIdDto { Id = booking.Id.Value };
        }
    }
}