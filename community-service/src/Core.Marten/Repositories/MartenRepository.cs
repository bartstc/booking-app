using System;
using System.Threading;
using System.Threading.Tasks;
using Core.Domain;
using Core.Domain.Repositories;
using Core.Marten.DomainEvents;
using Marten;

namespace Core.Marten.Repositories
{
    public class MartenRepository<TAggregate> : IRepository<TAggregate> where TAggregate : class, IAggregate
    {
        private readonly IDocumentSession documentSession;
        private readonly IDomainEventCollector domainEventCollector;

        public MartenRepository(
            IDocumentSession documentSession,
            IDomainEventCollector domainEventCollector)
        {
            this.documentSession = documentSession;
            this.domainEventCollector = domainEventCollector;
        }

        public async Task<TAggregate> FindAsync(Guid id, CancellationToken cancellationToken) =>
            await documentSession.Events.AggregateStreamAsync<TAggregate>(id, token:cancellationToken);

        public void Store(TAggregate aggregate, CancellationToken cancellationToken)
        {
            var events = aggregate.DequeueUncommittedEvents();
            
            domainEventCollector.AppendAll(events);

            documentSession.Events.Append(
                aggregate.Id,
                events
            );
        }
    }
}
