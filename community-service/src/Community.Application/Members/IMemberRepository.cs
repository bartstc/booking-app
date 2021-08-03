using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Community.Domain.Members.ValueObjects;

namespace Community.Application.Members
{
    public interface IMemberRepository
    {
        Task<bool> ExistsAsync(string email);
        Task<IEnumerable<ArchivalBooking>> GetArchivalBookingsAsync(Guid memberId);
    }
}
