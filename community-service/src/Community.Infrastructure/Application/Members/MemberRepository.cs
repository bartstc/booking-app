using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Community.Application.Members;
using Community.Domain.Members.ValueObjects;
using Community.Infrastructure.Application.Members.Projections;
using Marten;

namespace Community.Infrastructure.Application.Members
{
    public class MemberRepository : IMemberRepository
    {
        private readonly IQuerySession querySession;

        public MemberRepository(IQuerySession querySession)
        {
            this.querySession = querySession;
        }

        public async Task<bool> ExistsAsync(string email)
        {
            var result = await querySession.Query<ActiveMemberEmail>()
                .Where(m => m.Email == email)
                .SingleOrDefaultAsync();
                
            return result != null;
        }

        public async Task<IEnumerable<ArchivalBooking>> GetArchivalBookingsAsync(Guid memberId)
        {
            var projection = await querySession.LoadAsync<MemberArchivalBookings>(memberId);
            return projection.ArchivalBookings;
        }
    }
}
