using Accessibility.Domain.SharedKernel;

namespace Accessibility.Application.Bookings.Book.EventBus
{
    public interface IBookEventBus
    {
        void Publish(BookingOrderMessage message, FacilityId facilityId);
    }
}
