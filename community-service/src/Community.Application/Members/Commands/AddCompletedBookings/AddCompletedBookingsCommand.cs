using System;
using System.Collections.Generic;
using Core.Commands;

namespace Community.Application.Members.Commands.AddCompletedBookings
{
    public class AddCompletedBookingsCommand : ICommand
    {
        public Guid MemberId { get; private set; }
        public IEnumerable<BookingData> Bookings { get; private set; }
    }
}
