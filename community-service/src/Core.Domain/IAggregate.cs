using System;
using System.Collections.Generic;

namespace Core.Domain
{
    public interface IAggregate : IAggregate<Guid>
    {
    }

    public interface IAggregate<TId>
    {
        TId Id { get; }
        IEnumerable<IEvent> DequeueUncommittedEvents();
    }
}