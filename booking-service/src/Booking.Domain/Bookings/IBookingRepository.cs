using System.Threading.Tasks;

namespace Booking.Domain.Bookings
{
    public interface IBookingRepository
    {
        Task AddAsync(Booking booking);
        Task<Booking> GetByIdAsync(BookingId id);
    }
}