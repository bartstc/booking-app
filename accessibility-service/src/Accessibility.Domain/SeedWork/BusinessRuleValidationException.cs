using System;

namespace Accessibility.Domain.SeedWork
{
    public class BusinessRuleValidationException : Exception
    {
        public IBusinessRule Rule { get; set; }

        public BusinessRuleValidationException(IBusinessRule rule) : base(rule.Message)
        {
            Rule = rule;
        }

        public override string ToString()
        {
            return $"{Rule.GetType().FullName}: {Rule.Message}";
        }
    }
}