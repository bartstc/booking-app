using System;
using MediatR;

namespace Core.DomainEvents
{
    public interface IDomainEventNotification<out TDomainEvent> : IDomainEventNotification
    {
        TDomainEvent DomainEvent { get; }
    }

    public interface IDomainEventNotification : INotification
    {
        Guid Id { get; }
    }
}
