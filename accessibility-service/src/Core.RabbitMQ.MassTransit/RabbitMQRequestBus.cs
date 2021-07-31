using System.Threading.Tasks;
using Core.IntegrationEvents;
using MassTransit;

namespace Core.RabbitMQ.MassTransit
{
    public class RabbitMQRequestBus<TRequest> : IRequestBus<TRequest>
        where TRequest : class
    {
        private readonly IRequestClient<TRequest> requestClient;

        public RabbitMQRequestBus(IRequestClient<TRequest> requestClient)
        {
            this.requestClient = requestClient;
        }

        public async Task<TResponse> GetResponseAsync<TResponse>(TRequest request)
            where TResponse : class
        {
            return (await requestClient.GetResponse<TResponse>(request)).Message;
        }
    }
}
