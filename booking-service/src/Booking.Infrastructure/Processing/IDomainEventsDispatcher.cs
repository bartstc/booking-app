using System.Threading.Tasks;

namespace Booking.Infrastructure.Processing
{
    public interface IDomainEventsDispatcher
    {
        Task DispatchAsync();
    }
}