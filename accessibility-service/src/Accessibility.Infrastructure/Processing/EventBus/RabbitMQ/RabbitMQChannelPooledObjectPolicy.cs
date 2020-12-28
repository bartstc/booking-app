using Microsoft.Extensions.ObjectPool;
using Microsoft.Extensions.Options;
using RabbitMQ.Client;

namespace Accessibility.Infrastructure.Processing.EventBus.RabbitMQ
{
    public class RabbitMQChannelPooledObjectPolicy : PooledObjectPolicy<IModel>
    {
        private readonly IConnection connection;

        public RabbitMQChannelPooledObjectPolicy(IOptions<RabbitMQOptions> options)
        {
            var rabbitOptions = options.Value;
            connection = new ConnectionFactory() { HostName = rabbitOptions.HostName }
                .CreateConnection();
        }

        public override IModel Create()
        {
            return connection.CreateModel();
        }

        public override bool Return(IModel obj)
        {
            if (obj.IsOpen)
                return true;
            
            obj?.Dispose();
            return false;
        }
    }
}
