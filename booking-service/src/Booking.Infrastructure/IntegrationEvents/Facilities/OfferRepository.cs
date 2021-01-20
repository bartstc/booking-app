using System.Threading.Tasks;
using Booking.Application.Facilities;
using Booking.Infrastructure.Database;

namespace Booking.Infrastructure.IntegrationEvents.Facilities
{
    public class OfferRepository : IOfferRepository
    {
        private readonly BookingContext ctx;

        public OfferRepository(BookingContext ctx)
        {
            this.ctx = ctx;
        }

        public async Task AddAsync(Offer offer)
        {
            await ctx.AddAsync(offer);
        }
    }
}
