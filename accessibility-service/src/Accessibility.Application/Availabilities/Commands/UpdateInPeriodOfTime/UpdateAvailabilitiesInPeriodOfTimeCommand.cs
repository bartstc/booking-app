using System;
using System.Collections.Generic;
using Accessibility.Application.SeedWork;
using Accessibility.Domain.Schedules;
using Accessibility.Domain.SharedKernel;
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
