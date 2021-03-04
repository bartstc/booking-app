using System.Threading.Tasks;

namespace Accessibility.Domain.Bookings
{
    public interface IBookingRepository
    {
        Task AddAsync(Booking booking);
        Task<Booking> GetByIdAsync(BookingId id);
    }
}