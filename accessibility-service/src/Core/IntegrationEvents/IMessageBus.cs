using System.Threading.Tasks;

namespace Core.IntegrationEvents
{
    public interface IMessageBus
    {
        Task SendAsync<TMessage>(string exchange, TMessage message);
    }
}
