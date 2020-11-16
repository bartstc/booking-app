using System.Threading.Tasks;

namespace Accessibility.Infrastructure.Utils
{
    public interface IDomainEventsDispatcher
    {
        Task DispatchAsync();
    }
}