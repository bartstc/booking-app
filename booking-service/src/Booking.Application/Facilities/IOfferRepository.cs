using System.Threading.Tasks;
using Booking.Application.Facilities.IntegrationEvents.Events;

namespace Booking.Application.Facilities
{
    public interface IOfferRepository
    {
        Task AddAsync(OfferCreated offer);
    }
}
