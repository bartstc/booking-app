using System.Threading.Tasks;
using Core.Domain;

namespace Community.Domain.Members.Rules
{
    public class MemberEmailMustBeUniqueRule : IBusinessRuleAsync
    {
        private readonly string email;
        private readonly IMemberUniquenessChecker memberUniquenessChecker;

        public MemberEmailMustBeUniqueRule(string email, IMemberUniquenessChecker memberUniquenessChecker)
        {
            this.email = email;
            this.memberUniquenessChecker = memberUniquenessChecker;
        }

        public string Message =>
            "Member with the folowing email already exists.";

        public async Task<bool> IsBrokenAsync() =>
            !await memberUniquenessChecker.IsUnique(email);
    }
}
