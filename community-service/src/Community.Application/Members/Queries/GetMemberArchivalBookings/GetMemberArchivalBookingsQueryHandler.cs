using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Community.Domain.Members.ValueObjects;
using Core.Queries;

namespace Community.Application.Members.Queries.GetMemberArchivalBookings
{
    public class GetMemberArchivalBookingsQueryHandler : IQueryHandler<GetMemberArchivalBookingsQuery, IEnumerable<ArchivalBooking>>
    {
        private readonly IMemberRepository memberRepository;

        public GetMemberArchivalBookingsQueryHandler(IMemberRepository memberRepository)
        {
            this.memberRepository = memberRepository;
        }

        public async Task<IEnumerable<ArchivalBooking>> Handle(GetMemberArchivalBookingsQuery request, CancellationToken cancellationToken)
        {
            return await memberRepository.GetArchivalBookingsAsync(request.MemberId);
        }
    }
}
