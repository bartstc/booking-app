using System;
using System.Threading.Tasks;
using Community.Domain.Members;

namespace Community.Application.Members.DomainServices
{
    public class MemberUniquenessChecker : IMemberUniquenessChecker
    {
        public async Task<bool> IsUnique(string email)
        {
            return true;
        }
    }
}
