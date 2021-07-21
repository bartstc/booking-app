using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MediatR;
using Core.Domain;
using Core.Marten.DomainEvents;

namespace Core.Processing
{
    public class DomainEventsDispatcher : IDomainEventsDispatcher
    {
        private readonly IMediator mediator;
        private readonly IDomainEventCollector domainEventCollector;

        public DomainEventsDispatcher(
            IMediator mediator,
            IDomainEventCollector domainEventCollector)
        {
            this.mediator = mediator;
            this.domainEventCollector = domainEventCollector;
        }

        public async Task DispatchAsync()
        {
            var domainEvents = domainEventCollector.Events;

            await PublishDomainEventsAsync(domainEvents);
        }

        private async Task PublishDomainEventsAsync(IEnumerable<IEvent> domainEvents)
        {
            var tasks = domainEvents
                .Select(async (domainEvent) => await mediator.Publish(domainEvent));

            await Task.WhenAll(tasks);
        }
    }
}