using System;
using System.Collections.Generic;

namespace Accessibility.Application.Availabilities.Commands.UpdateInPeriodOfTime
{
    public record UpdateAvailabilitiesDto(
        DateTime DateFrom,
        DateTime DateTo,
        Guid EmployeeId,
        Guid CreatorId,
        IEnumerable<UpdatedAvailability> Availabilities
    );

    public record UpdatedAvailability(
        DateTime StartTime,
        DateTime EndTime
    );
}
