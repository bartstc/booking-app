using System;

namespace Booking.Domain.SeedWork
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