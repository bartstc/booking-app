using System.Collections.Generic;
using System.Threading.Tasks;
using Accessibility.Domain.SharedKernel;

namespace Accessibility.Domain.Bookings
{
    public interface IBookingRepository
    {
        Task AddAsync(Booking booking);
        void DeleteAsync(Booking booking);
        Task<Booking> GetByIdAsync(BookingId id, FacilityId facilityId);
        Task<IEnumerable<Booking>> GetAllCompletedAsync();
    }
}