using System.Text;
using Accessibility.Application.Bookings.Book.EventBus;
using Accessibility.Domain.SharedKernel;
using Microsoft.Extensions.ObjectPool;
using Newtonsoft.Json;
using RabbitMQ.Client;

namespace Accessibility.Infrastructure.Domain.Bookings
{
    public class BookRabbitEventBus : IBookEventBus
    {
        private const string exchange = "booking_orders";
        private readonly ObjectPool<IModel> rabbitPool;

        public BookRabbitEventBus(ObjectPool<IModel> rabbitPool)
        {
            this.rabbitPool = rabbitPool;
        }

        public void Publish(BookingOrderMessage message, FacilityId facilityId)
        {
            var channel = rabbitPool.Get();

            try
            {
                channel.ExchangeDeclare(
                    exchange: exchange,
                    type: "direct",
                    durable: true,
                    autoDelete: false,
                    arguments: null);

                var body = Encoding.UTF8.GetBytes(JsonConvert.SerializeObject(message));

                channel.BasicPublish(
                    exchange: exchange,
                    routingKey: facilityId.Value.ToString(),
                    basicProperties: null,
                    body: body
                );
            }
            finally
            {
                rabbitPool.Return(channel);
            }
        }
    }
}
