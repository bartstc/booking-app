using System.Threading.Tasks;
using Booking.Domain.Bookings;
using Booking.Infrastructure.Database;
using Microsoft.EntityFrameworkCore;

namespace Booking.Infrastructure.Domain.Bookings
{
    public class BookingRepository : IBookingRepository
    {
        private readonly BookingContext ctx;

        public BookingRepository(BookingContext ctx)
        {
            this.ctx = ctx;
        }

        public async Task AddAsync(Booking.Domain.Bookings.Booking booking)
        {
            await ctx.AddAsync(booking);
        }

        public async Task<Booking.Domain.Bookings.Booking> GetByIdAsync(BookingId id) =>
            await ctx.Bookings
                .FirstAsync(b => b.Id == id);
    }
}