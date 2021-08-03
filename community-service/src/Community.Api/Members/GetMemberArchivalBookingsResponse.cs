using System.Collections.Generic;
using Community.Domain.Members.ValueObjects;

namespace Community.Api.Members
{
    public record GetMemberArchivalBookingsResponse(
        IEnumerable<ArchivalBooking> Bookings
    );
}
