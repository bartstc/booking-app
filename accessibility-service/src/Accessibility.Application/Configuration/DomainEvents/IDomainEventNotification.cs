using System;
using MediatR;

namespace Accessibility.Application.Configuration.DomainEvents
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