using System;
using System.Threading.Tasks;

namespace Accessibility.Application.Facilities
{
    public interface IOfferQueryRepository
    {
        Task<short> GetOfferDuration(Guid facilityId, Guid offerId);
    }
}
