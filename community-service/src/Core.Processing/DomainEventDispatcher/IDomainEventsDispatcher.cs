using System.Threading.Tasks;

namespace Core.Processing.DomainEventDispatcher
{
    public interface IDomainEventsDispatcher
    {
        Task DispatchAsync();
    }
}