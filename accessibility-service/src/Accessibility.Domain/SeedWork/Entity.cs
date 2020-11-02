using System.Collections.Generic;

namespace Accessibility.Domain.SeedWork
{
    public abstract class Entity
    {
        private List<IDomainEvent> domainEvents;

        public IReadOnlyCollection<IDomainEvent> DomainEvents => domainEvents?.AsReadOnly();

        protected void AddDomainEvent(IDomainEvent domainEvent)
        {
            domainEvents = domainEvents ?? new List<IDomainEvent>();
            domainEvents.Add(domainEvent);
        }

        protected void ClearDomainEvents() =>
            domainEvents?.Clear();

        protected void CheckRule(IBusinessRule rule)
        {
            if (rule.IsBroken())
            throw new BusinessRuleValidationException(rule);
        }
    }
}