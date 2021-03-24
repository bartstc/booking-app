using System.Threading.Tasks;

namespace Accessibility.Domain.SeedWork
{
    public interface IBusinessRuleBase
    {
         string Message { get; }
    }

    public interface IBusinessRule : IBusinessRuleBase
    {
         bool IsBroken();
    }

    public interface IBusinessRuleAsync : IBusinessRuleBase
    {
        Task<bool> IsBrokenAsync();
    }
}