using System;
using Core.Domain;
using Newtonsoft.Json;

namespace Core.DomainEvents
{
    public class DomainNotificationBase<TDomainEvent> : IDomainEventNotification<TDomainEvent> where TDomainEvent : IEvent
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