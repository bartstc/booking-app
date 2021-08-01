using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Accessibility.Domain.Bookings;
using Accessibility.Domain.Bookings.BookedRecords;
using Accessibility.Domain.SharedKernel;
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

        public void DeleteAsync(Booking booking)
        {
            ctx.Remove(booking);
        }

        public async Task<IEnumerable<Booking>> GetAllCompletedAsync() =>
            await ctx.Bookings
                .Where(b =>
                    b.Status == BookingStatus.Completed ||
                    b.BookedRecords.All(r => 
                        r.Status == BookedRecordStatus.Canceled ||
                        r.Status == BookedRecordStatus.NotRealized ||
                        r.Status == BookedRecordStatus.Fulfilled ||
                        r.Date.AddMinutes(r.DurationInMinutes) <= DateTime.Now
                ))
                .ToListAsync();

        public async Task<Booking> GetByIdAsync(BookingId id, FacilityId facilityId) =>
            await ctx.Bookings
                .FirstAsync(b => b.Id == id && b.FacilityId == facilityId);
    }
}