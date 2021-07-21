using System.Collections.Generic;
using Core.Domain;

namespace Core.Marten.DomainEvents
{
    public interface IDomainEventCollector
    {
        IReadOnlyCollection<IEvent> Events { get; }

        void AppendAll(IEnumerable<IEvent> events);
    }
}
