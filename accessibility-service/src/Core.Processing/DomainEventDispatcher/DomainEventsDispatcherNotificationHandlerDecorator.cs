using System.Threading;
using System.Threading.Tasks;
using MediatR;

namespace Core.Processing
{
    public class DomainEventsDispatcherNotificationHandlerDecorator<TNotification> : INotificationHandler<TNotification>
        where TNotification : INotification
    {
        private readonly INotificationHandler<TNotification> decorated;
        private readonly IDomainEventsDispatcher dispatcher;

        public DomainEventsDispatcherNotificationHandlerDecorator(
            INotificationHandler<TNotification> decorated,
            IDomainEventsDispatcher dispatcher)
        {
            this.decorated = decorated;
            this.dispatcher = dispatcher;
        }

        public async Task Handle(TNotification notification, CancellationToken cancellationToken)
        {
            await decorated.Handle(notification, cancellationToken);
            await dispatcher.DispatchAsync();
        }
    }
}
