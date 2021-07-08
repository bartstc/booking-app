using System;
using System.Collections.Generic;

namespace Core.Domain
{
    public abstract class AggregateRootBase : IAggregateRoot
    {
        [NonSerialized]
        private readonly Queue<IEvent> uncommittedEvents = new Queue<IEvent>();

        public Guid Id { get; protected set; }
        public int Version { get; protected set; }

        public IEnumerable<IEvent> DequeueUncommittedEvents()
        {
            var dequeuedEvents = uncommittedEvents.ToArray();

            uncommittedEvents.Clear();

            return dequeuedEvents;
        }

        protected void Enqueue(IEvent @event)
        {
            uncommittedEvents.Enqueue(@event);
        }
    }
}
