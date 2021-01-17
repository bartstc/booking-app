using System.Threading.Tasks;

namespace Booking.Application.Facilities
{
    public interface IOfferRepository
    {
        Task AddAsync(Offer offer);
    }
}
