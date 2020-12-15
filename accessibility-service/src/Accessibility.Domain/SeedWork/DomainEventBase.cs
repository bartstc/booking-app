using System;

namespace Accessibility.Domain.SeedWork
{
    public class DomainEventBase : IDomainEvent
    {
        public DomainEventBase()
        {
            OccuredOn = DateTime.Now;
        }

        public DateTime OccuredOn { get; }
    }
}