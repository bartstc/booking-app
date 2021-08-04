using System;
using Accessibility.Domain.Bookings.BookedRecords;
using Core.Commands;

namespace Accessibility.Application.BookedRecords.SetBookedRecordStatus
{
    public record SetBookedRecordStatusCommand(
        Guid BookingId,
        Guid FacilityId,
        Guid BookedRecordId,
        BookedRecordStatus Status,
        string Caution = null
    ) : ICommand;
}
