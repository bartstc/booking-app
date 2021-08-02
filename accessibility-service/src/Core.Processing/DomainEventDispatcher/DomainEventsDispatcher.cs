using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MediatR;
using Core.Domain;
using Microsoft.EntityFrameworkCore;
using Core.DomainEvents;
using Core.Processing.Outbox;
using Newtonsoft.Json;

namespace Core.Processing
{
    public class DomainEventsDispatcher<TDbContext> : IDomainEventsDispatcher where TDbContext : DbContext
    {
        private readonly TDbContext ctx;
        private readonly IMediator mediator;
        private readonly IDomainEventNotificationProvider domainEventNotificationProvider;

        public DomainEventsDispatcher(
            TDbContext ctx,
            IMediator mediator,
            IDomainEventNotificationProvider domainEventNotificationProvider)
        {
            this.ctx = ctx;
            this.mediator = mediator;
            this.domainEventNotificationProvider = domainEventNotificationProvider;
        }

        public async Task DispatchAsync()
        {
            var domainEntities = ctx.ChangeTracker
                .Entries<Entity>()
                .Where(e => e.Entity.DomainEvents != null && e.Entity.DomainEvents.Any())
                .ToList();

            var domainEvents = domainEntities.SelectMany(e => e.Entity.DomainEvents).ToList();

            var domainEventNotifications = GetDomainEventNotifications(domainEvents);
            domainEntities.ForEach(e => e.Entity.ClearDomainEvents());
            await PublishDomainEventsAsync(domainEvents);
            await PersistNotifications(domainEventNotifications);
        }

        private List<IDomainEventNotification<IDomainEvent>> GetDomainEventNotifications(List<IDomainEvent> domainEvents)
        {
            var domainEventNotifications = new List<IDomainEventNotification<IDomainEvent>>();

            foreach (var domainEvent in domainEvents)
            {
                var notifi = domainEventNotificationProvider.GetNotification(domainEvent);

                if (notifi != null)
                    domainEventNotifications.Add(notifi as IDomainEventNotification<IDomainEvent>);
            }

            return domainEventNotifications;
        }

        private async Task PersistNotifications(List<IDomainEventNotification<IDomainEvent>> domainEventNotifications)
        {
            foreach (var notification in domainEventNotifications)
            {
                var entity = new OutboxNotification(
                    notification.GetType().FullName,
                    notification.DomainEvent.OccuredOn,
                    JsonConvert.SerializeObject(notification)
                );
                await ctx.AddAsync(entity);
            }
        }

        private async Task PublishDomainEventsAsync(List<IDomainEvent> domainEvents)
        {
            var tasks = domainEvents
                .Select(async (domainEvent) => await mediator.Publish(domainEvent));

            await Task.WhenAll(tasks);
        }
    }
}