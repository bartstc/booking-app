using System.Threading.Tasks;
using Accessibility.Domain.Bookings;
using Accessibility.Infrastructure.Database;
using Microsoft.EntityFrameworkCore;

namespace Accessibility.Infrastructure.Domain.Bookings
{
    public class BookingRepository : IBookingRepository
    {
        private readonly AccessibilityContext ctx;

        public BookingRepository(AccessibilityContext ctx)
        {
            this.ctx = ctx;
        }

        public async Task AddAsync(Booking booking)
        {
            await ctx.AddAsync(booking);
        }

        public async Task<Booking> GetByIdAsync(BookingId id) =>
            await ctx.Bookings
                .FirstAsync(b => b.Id == id);
    }
}