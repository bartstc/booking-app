using System.Collections.Generic;
using System.Threading.Tasks;

namespace Core.Domain
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

        public void ClearDomainEvents() =>
            domainEvents?.Clear();

        protected void CheckRule(IBusinessRule rule)
        {
            if (rule.IsBroken())
                throw new BusinessRuleValidationException(rule);
        }

        protected async Task CheckRuleAsync(IBusinessRuleAsync rule)
        {
            if (await rule.IsBrokenAsync())
                throw new BusinessRuleValidationException(rule);
        }
    }
}