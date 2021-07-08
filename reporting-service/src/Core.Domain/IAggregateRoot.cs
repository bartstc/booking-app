using System;
using System.Collections.Generic;

namespace Core.Domain
{
    public interface IAggregateRoot : IAggregateRoot<Guid>
    {
    }

    public interface IAggregateRoot<TId>
    {
        TId Id { get; }
        IEnumerable<IEvent> DequeueUncommittedEvents();
    }
}