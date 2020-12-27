using Booking.Domain.SharedKernel;

namespace Booking.Application.Bookings.Book.EventBus
{
    public interface IBookEventBus
    {
        void Publish(BookingOrderMessage message, FacilityId facilityId);
    }
}
