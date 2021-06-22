using System;
using System.Threading.Tasks;
using Core.IntegrationEvents;
using MassTransit;

namespace Core.RabbitMQ.MassTransit
{
    public class RabbitMQMessageBus : IMessageBus
    {
        private readonly ISendEndpointProvider sendEndpointProvider;

        public RabbitMQMessageBus(ISendEndpointProvider sendEndpointProvider)
        {
            this.sendEndpointProvider = sendEndpointProvider;
        }

        public async Task SendAsync<TMessage>(string exchange, TMessage message)
        {
            var sendEndpoint = await sendEndpointProvider.GetSendEndpoint(new Uri($"exchange:{exchange}"));
            await sendEndpoint.Send(message);
        }
    }
}
