using System.Threading.Tasks;
using Accessibility.Application.Facilities;
using Accessibility.Infrastructure.Database;

namespace Accessibility.Infrastructure.Application.Facilities
{
    public class OfferRepository : IOfferRepository
    {
        private readonly AccessibilityContext ctx;

        public OfferRepository(AccessibilityContext ctx)
        {
            this.ctx = ctx;
        }

        public async Task AddAsync(Offer offer)
        {
            await ctx.AddAsync(offer);
        }
    }
}
