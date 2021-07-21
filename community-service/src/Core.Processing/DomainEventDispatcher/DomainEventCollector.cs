using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using Core.Domain;
using Core.Marten.DomainEvents;

namespace Core.Processing.DomainEventDispatcher
{
    public class DomainEventCollector : IDomainEventCollector
    {
        private readonly IList<IEvent> events = new List<IEvent>();

        public IReadOnlyCollection<IEvent> Events => new ReadOnlyCollection<IEvent>(events);
        
        public void AppendAll(IEnumerable<IEvent> events)
        {
            foreach (var @event in events)
            {
                events.Append(@event);
            }
        }
    }
}
