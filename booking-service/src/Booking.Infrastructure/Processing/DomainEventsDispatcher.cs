using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Booking.Domain.SeedWork;
using Booking.Infrastructure.Database;
using Booking.Application.Configuration.DomainEvents;
using System;
using MediatR;
using Booking.Infrastructure.Processing.Outbox;
using System.Text.Json;

namespace Booking.Infrastructure.Processing
{
    public class DomainEventsDispatcher : IDomainEventsDispatcher
    {
        private readonly BookingContext ctx;
        private readonly IMediator mediator;
        private readonly IAssemblyProvider assemblyProvider;

        public DomainEventsDispatcher(BookingContext ctx, IMediator mediator, IAssemblyProvider assemblyProvider)
        {
            this.ctx = ctx;
            this.mediator = mediator;
            this.assemblyProvider = assemblyProvider;
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
                Type notifiType = typeof(IDomainEventNotification<>);
                var notifiGenericType = notifiType.MakeGenericType(domainEvent.GetType());

                var type = assemblyProvider.Application.GetExportedTypes()
                    .Where(t => !t.IsInterface && !t.IsAbstract && notifiGenericType.IsAssignableFrom(t))
                    .FirstOrDefault();

                if (type == null)
                    continue;

                // TODO: resolve instance from di container
                var notifi = Activator.CreateInstance(type, domainEvent);

                if (notifi != null)
                    domainEventNotifications.Add(notifi as IDomainEventNotification<IDomainEvent>);
            }

            return domainEventNotifications;
        }

        private async Task PublishDomainEventsAsync(List<IDomainEvent> domainEvents)
        {
            var tasks = domainEvents
                .Select(async (domainEvent) => await mediator.Publish(domainEvent));

            await Task.WhenAll(tasks);
        }

        private async Task PersistNotifications(List<IDomainEventNotification<IDomainEvent>> domainEventNotifications)
        {
            foreach (var notification in domainEventNotifications)
            {
                var entity = new OutboxNotification(
                    notification.GetType().FullName,
                    notification.DomainEvent.OccuredOn,
                    JsonSerializer.Serialize(notification)
                );
                await ctx.OutboxNotifications.AddAsync(entity);
            }
        }
    }
}