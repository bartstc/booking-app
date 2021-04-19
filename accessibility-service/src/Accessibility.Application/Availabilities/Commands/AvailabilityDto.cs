using System;

namespace Accessibility.Application.Availabilities.Commands
{
    public record AvailabilityDto(Guid EmployeeId, DateTime StartTime, DateTime EndTime, Guid CreatorId);
}
