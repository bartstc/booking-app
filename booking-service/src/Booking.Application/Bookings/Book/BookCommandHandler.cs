using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Booking.Application.Bookings.Book.EventBus;
using Booking.Domain.Bookings;
using Booking.Domain.Bookings.BookedRecords;
using Booking.Domain.SeedWork;
using Booking.Domain.SharedKernel;
using MediatR;

namespace Booking.Application.Bookings.Book
{
    public class BookCommandHandler : IRequestHandler<BookCommand>
    {
        private readonly IBookingRepository repo;
        private readonly IUnitOfWork unitOfWork;
        private readonly IBookEventBus eventBus;

        public BookCommandHandler(IBookingRepository repo, IUnitOfWork unitOfWork, IBookEventBus eventBus)
        {
            this.repo = repo;
            this.unitOfWork = unitOfWork;
            this.eventBus = eventBus;
        }

        public Task<Unit> Handle(BookCommand request, CancellationToken cancellationToken)
        {
            eventBus.Publish(
                new BookingOrderMessage(
                    new CustomerId(request.CustomerId),
                    request.BookedRecords.Select(r => new BookedRecordMessage(
                        new EmployeeId(r.EmployeeId),
                        new OfferId(r.OfferId),
                        r.Date
                    )).ToList()
                ),
                new FacilityId(request.FacilityId));

            return Unit.Task;
        }
    }
}