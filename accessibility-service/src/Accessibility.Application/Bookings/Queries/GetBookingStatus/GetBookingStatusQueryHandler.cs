using System.Threading;
using System.Threading.Tasks;
using Accessibility.Domain.Bookings;
using MediatR;

namespace Accessibility.Application.Bookings.Queries.GetBookingStatus
{
    public class GetBookingStatusQueryHandler : IRequestHandler<GetBookingStatusQuery, BookingStatus?>
    {
        private readonly IBookingQueryRepository repository;

        public GetBookingStatusQueryHandler(IBookingQueryRepository repository)
        {
            this.repository = repository;
        }

        public async Task<BookingStatus?> Handle(GetBookingStatusQuery request, CancellationToken cancellationToken)
        {
            var value = await repository.GetBookingStatus(request.BookingId, request.FacilityId);
            if (value == null)
            {
                return null;
            }
            return (BookingStatus)value.Value;
        }
    }
}
