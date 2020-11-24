using System;
using System.Linq;
using Accessibility.Domain.SeedWork;
using Xunit;

namespace Accessibility.UnitTests.SeedWork
{
    public abstract class TestBase
    {
        protected TEvent AssertDomainEventPublished<TEvent>(Entity entity) where TEvent : class, IDomainEvent
        {
            var result = entity.DomainEvents?.OfType<TEvent>().SingleOrDefault();

            if (result == null)
                throw new Exception($"{typeof(TEvent).Name} event not published");
            
            return result;
        }

        protected void AssertBusinessRuleBroke<TRule>(Action act)
        {
            var result = Assert.Throws<BusinessRuleValidationException>(act);
            Assert.IsType<TRule>(result.Rule);
        }
    }
}