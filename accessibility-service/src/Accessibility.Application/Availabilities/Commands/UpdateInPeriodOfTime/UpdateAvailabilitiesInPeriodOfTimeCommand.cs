using System;
using System.Collections.Generic;
using Accessibility.Domain.Schedules;
using Accessibility.Domain.SharedKernel;
using Core.Commands;
using MediatR;

namespace Accessibility.Application.Availabilities.Commands.UpdateInPeriodOfTime
{
    public record UpdateAvailabilitiesInPeriodOfTimeCommand(
        FacilityId FacilityId,
        ScheduleId ScheduleId,
        DateTime DateFrom,
        DateTime DateTo,
        IEnumerable<AvailabilityDto> Availabilities
    ) : IRequest<CommandResult<int>>;
}
