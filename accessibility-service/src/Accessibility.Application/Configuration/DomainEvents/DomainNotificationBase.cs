using System;
using Accessibility.Domain.SeedWork;
using Newtonsoft.Json;

namespace Accessibility.Application.Configuration.DomainEvents
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