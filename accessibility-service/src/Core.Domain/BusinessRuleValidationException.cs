using System;

namespace Core.Domain
{
    public class BusinessRuleValidationException : Exception
    {
        public IBusinessRuleBase Rule { get; set; }

        public BusinessRuleValidationException(IBusinessRuleBase rule) : base(rule.Message)
        {
            Rule = rule;
        }

        public override string ToString()
        {
            return $"{Rule.GetType().FullName}: {Rule.Message}";
        }
    }
}