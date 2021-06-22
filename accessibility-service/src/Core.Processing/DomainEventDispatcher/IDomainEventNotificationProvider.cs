using Core.Domain;
using Core.DomainEvents;

namespace Core.Processing
{
    public interface IDomainEventNotificationProvider
    {
        IDomainEventNotification<TDomainEvent> GetNotification<TDomainEvent>(TDomainEvent domainEvent) where TDomainEvent : IDomainEvent;
    }
}