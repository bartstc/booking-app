using System.Threading.Tasks;
using Accessibility.Domain.Bookings;
using Accessibility.Infrastructure.Database;

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
    }
}