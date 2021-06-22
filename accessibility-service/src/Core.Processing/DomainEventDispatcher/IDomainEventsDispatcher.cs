using System.Threading.Tasks;

namespace Core.Processing
{
    public interface IDomainEventsDispatcher
    {
        Task DispatchAsync();
    }
}