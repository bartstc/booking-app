using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Accessibility.Application.Facilities;
using Accessibility.Domain.SharedKernel;
using Accessibility.Infrastructure.Database;
using Microsoft.EntityFrameworkCore;

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
        
        public async Task<IEnumerable<Offer>> GetByIdsAsync(IEnumerable<OfferId> ids) =>
            await ctx.Offers
                .Where(offer => ids.Contains(offer.Id))
                .AsNoTracking()
                .ToListAsync();
    }
}
