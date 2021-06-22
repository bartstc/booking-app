using System;
using System.Text.Json.Serialization;
using Core.Domain;

namespace Core.DomainEvents
{
    public class DomainNotificationBase<TDomainEvent> : IDomainEventNotification<TDomainEvent> where TDomainEvent : IDomainEvent
    {
        public DomainNotificationBase(TDomainEvent domainEvent)
        {
            DomainEvent = domainEvent;
            Id = Guid.NewGuid();
        }

        [JsonIgnore]
        public TDomainEvent DomainEvent { get; }

        public Guid Id { get; }
    }
}