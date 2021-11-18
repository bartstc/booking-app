using System.Threading;
using System.Threading.Tasks;
using Core.Queries;

namespace Community.Application.Members.Queries.GetMemberByEmail
{
    public class GetMemberByEmailQueryHandler : IQueryHandler<GetMemberByEmailQuery, MemberData>
    {
        private readonly IMemberRepository memberRepository;

        public GetMemberByEmailQueryHandler(IMemberRepository memberRepository)
        {
            this.memberRepository = memberRepository;
        }

        public Task<MemberData> Handle(GetMemberByEmailQuery request, CancellationToken cancellationToken)
        {
            return memberRepository.GetByEmail(request.Email);
        }
    }
}
