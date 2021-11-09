using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MediatR;
using Core.Domain;
using Marten;
using Core.DomainEvents;
using Dapper;
using Newtonsoft.Json;
using Core.Marten.UnitOfWork;

namespace Core.Processing.DomainEventDispatcher
{
    public class DomainEventsDispatcher : IDomainEventsDispatcher
    {
        private readonly IDocumentStore documentStore;
        private readonly ITransactionalDocumentSessionFactory dbConnectionFactory;
        private readonly IDomainEventNotificationProvider domainEventNotificationProvider;

        public DomainEventsDispatcher(
            ITransactionalDocumentSessionFactory dbConnectionFactory,
            IMediator mediator,
            IDomainEventNotificationProvider domainEventNotificationProvider)
        {
            this.dbConnectionFactory = dbConnectionFactory;
            this.domainEventNotificationProvider = domainEventNotificationProvider;
        }

        public async Task DispatchAsync()
        {
            var events = dbConnectionFactory.DocumentSession
                .PendingChanges
                .Streams()
                .SelectMany(stream => stream.Events)
                .Select(@event => @event.Data as IEvent);

            if (events.Any())
            {
                var eventNotifications = GetDomainEventNotifications(events);

                if (eventNotifications.Any())
                    await PersistNotifications(eventNotifications);
            }
        }

        private IEnumerable<IDomainEventNotification<IEvent>> GetDomainEventNotifications(IEnumerable<IEvent> domainEvents)
        {
            var domainEventNotifications = new List<IDomainEventNotification<IEvent>>();

            foreach (var domainEvent in domainEvents)
            {
                var notifi = domainEventNotificationProvider.GetNotification(domainEvent);

                if (notifi != null)
                    domainEventNotifications.Add(notifi as IDomainEventNotification<IEvent>);
            }

            return domainEventNotifications;
        }

        private async Task PersistNotifications(IEnumerable<IDomainEventNotification<IEvent>> domainEventNotifications)
        {
            foreach (var notification in domainEventNotifications)
            {
                await dbConnectionFactory.DbConnection.ExecuteAsync(
                    @"insert into app.outbox_notifications (type, occured_date, data)
                    values (@Type, @Occured_date, @Data)",
                    new
                    {
                        Type = notification.GetType().FullName,
                        Occured_date = notification.DomainEvent.OcucuredOn,
                        Data = JsonConvert.SerializeObject(notification)
                    }
                );
            }
        }
    }
}