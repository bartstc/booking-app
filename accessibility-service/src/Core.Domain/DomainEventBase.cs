using System;

namespace Core.Domain
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