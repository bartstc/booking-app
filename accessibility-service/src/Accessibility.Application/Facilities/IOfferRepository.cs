using System.Threading.Tasks;

namespace Accessibility.Application.Facilities
{
    public interface IOfferRepository
    {
        Task AddAsync(Offer offer);
    }
}
