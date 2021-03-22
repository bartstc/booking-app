using System.Threading.Tasks;
using Accessibility.Domain.SharedKernel;

namespace Accessibility.Domain.Bookings
{
    public interface IBookingRepository
    {
        Task AddAsync(Booking booking);
        Task<Booking> GetByIdAsync(BookingId id, FacilityId facilityId);
    }
}