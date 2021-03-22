using Accessibility.Domain.Bookings;
using Accessibility.Domain.SharedKernel;
using MediatR;

namespace Accessibility.Application.Bookings.Queries.GetBookingStatus
{
    public class GetBookingStatusQuery : IRequest<BookingStatus?>
    {
        public GetBookingStatusQuery(BookingId bookingId, FacilityId facilityId)
        {
            BookingId = bookingId;
            FacilityId = facilityId;
        }

        public BookingId BookingId { get; }
        public FacilityId FacilityId { get; }
    }
}
