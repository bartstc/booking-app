using System;
using Core.Commands;

namespace Accessibility.Application.Availabilities.Commands.UpdateInPeriodOfTime
{
    public record UpdateAvailabilitiesInPeriodOfTimeCommand(
        Guid FacilityId,
        Guid ScheduleId,
        UpdateAvailabilitiesDto Dto
    ) : ICommand;
}
