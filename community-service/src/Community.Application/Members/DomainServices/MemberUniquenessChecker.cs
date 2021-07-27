using System.Threading.Tasks;
using Community.Domain.Members;

namespace Community.Application.Members.DomainServices
{
    public class MemberUniquenessChecker : IMemberUniquenessChecker
    {
        private readonly IMemberRepository memberRepository;

        public MemberUniquenessChecker(IMemberRepository memberRepository)
        {
            this.memberRepository = memberRepository;
        }
        
        public async Task<bool> IsUnique(string email) =>
            !await memberRepository.ExistsAsync(email);
    }
}
