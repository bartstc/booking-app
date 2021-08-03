using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Community.Application.Members;
using Community.Domain.Members;
using Community.Domain.Members.ValueObjects;
using Community.Infrastructure.Application.Members.Projections;
using Marten;

namespace Community.Infrastructure.Application.Members
{
    public class MemberRepository : IMemberRepository
    {
        private readonly IQuerySession querySession;
        private readonly IDocumentSession documentSession;

        public MemberRepository(IQuerySession querySession, IDocumentSession documentSession)
        {
            this.querySession = querySession;
            this.documentSession = documentSession;
        }

        public async Task<bool> ExistsAsync(string email)
        {
            // TODO: Use projection instead of querying aggregate
            var result = (await querySession.QueryAsync<Member>("where data ->> 'Email' = ?", parameters: email)).FirstOrDefault();
            return result != null;
        }

        public async Task<IEnumerable<ArchivalBooking>> GetArchivalBookingsAsync(Guid memberId)
        {
            var projection = await querySession.LoadAsync<MemberArchivalBookings>(memberId);
            return projection.ArchivalBookings;
        }
    }
}
