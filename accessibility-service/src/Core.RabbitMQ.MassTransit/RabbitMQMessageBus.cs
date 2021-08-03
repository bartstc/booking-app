using System;
using System.Threading.Tasks;
using Core.IntegrationEvents;
using MassTransit;

namespace Core.RabbitMQ.MassTransit
{
    public class RabbitMQMessageBus : IMessageBus
    {
        private readonly ISendEndpointProvider sendEndpointProvider;
        private readonly IPublishEndpoint publishEndpoint;

        public RabbitMQMessageBus(ISendEndpointProvider sendEndpointProvider, IPublishEndpoint publishEndpoint)
        {
            this.sendEndpointProvider = sendEndpointProvider;
            this.publishEndpoint = publishEndpoint;
        }

        public async Task SendAsync<TMessage>(string exchange, TMessage message)
        {
            var sendEndpoint = await sendEndpointProvider.GetSendEndpoint(new Uri($"exchange:{exchange}"));
            await sendEndpoint.Send(message);
        }

        public async Task PublishAsync<TMessage>(TMessage message)
        {
            await publishEndpoint.Publish(message);
        }
    }
}
