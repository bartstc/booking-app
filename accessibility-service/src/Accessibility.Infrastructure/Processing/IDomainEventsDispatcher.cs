using System.Threading.Tasks;

namespace Accessibility.Infrastructure.Processing
{
    public interface IDomainEventsDispatcher
    {
        Task DispatchAsync();
    }
}