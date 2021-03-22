using System.Collections.Generic;
using System.Threading.Tasks;
using Accessibility.Domain.SharedKernel;

namespace Accessibility.Application.Facilities
{
    public interface IOfferRepository
    {
        Task AddAsync(Offer offer);
        Task<IEnumerable<Offer>> GetByIdsAsync(IEnumerable<OfferId> ids);
    }
}
