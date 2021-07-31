using System;
using System.Collections.Generic;
using Core.Commands;

namespace Accessibility.Application.Bookings.Commands.CreateBooking
{
    public record CreateBookingCommand(
        Guid CustomerId,
        Guid FacilityId,
        IEnumerable<BookedRecordDto> BookedRecords,
        bool IsMadeManually
    ) : ICommand;
}
