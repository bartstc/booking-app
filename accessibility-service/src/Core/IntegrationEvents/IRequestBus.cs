using System.Threading.Tasks;

namespace Core.IntegrationEvents
{
    public interface IRequestBus<TRequest>
        where TRequest : class
    {
        Task<TResponse> GetResponseAsync<TResponse>(TRequest request)
            where TResponse : class;
    }
}
