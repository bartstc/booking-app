using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Core.Domain
{
    public abstract class AggregateBase : IAggregate
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

        protected static void CheckRule(IBusinessRule rule)
        {
            if (rule.IsBroken())
                throw new BusinessRuleValidationException(rule);
        }

        protected static async Task CheckRuleAsync(IBusinessRuleAsync rule)
        {
            if (await rule.IsBrokenAsync())
                throw new BusinessRuleValidationException(rule);
        }
    }
}
