using System;
using System.Collections.Generic;
using Community.Domain.Members.ValueObjects;
using Core.Queries;

namespace Community.Application.Members.Queries.GetMemberArchivalBookings
{
    public record GetMemberArchivalBookingsQuery(Guid MemberId)
        : IQuery<IEnumerable<ArchivalBooking>>;
}
