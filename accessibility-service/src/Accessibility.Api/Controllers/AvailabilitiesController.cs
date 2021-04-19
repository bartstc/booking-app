using System;
using System.Net;
using System.Threading.Tasks;
using Accessibility.Api.Availabilities;
using Accessibility.Application.Availabilities.Commands.UpdateInPeriodOfTime;
using Accessibility.Application.Availabilities.Queries;
using Accessibility.Application.Availabilities.Queries.GetAvailabilites;
using Accessibility.Domain.Schedules;
using Accessibility.Domain.SharedKernel;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Accessibility.Api.Controllers
{
    [ApiController]
    [Route("facilities/{facilityId}/schedules/{scheduleId}/availabilities")]
    public class AvailabilitiesController : ControllerBase
    {
        private readonly IMediator mediator;

        public AvailabilitiesController(IMediator mediator)
        {
            this.mediator = mediator;
        }

        [HttpGet]
        [ProducesResponseType(typeof(CollectionResponse<AvailabilityDto>), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> Get(
            [FromRoute] Guid facilityId,
            [FromRoute] Guid scheduleId,
            [FromQuery] DateTime? startTime,
            [FromQuery] DateTime? endTime,
            [FromQuery] Guid employeeId)
        {
            var result = await mediator.Send(employeeId == Guid.Empty ?
                new GetAvailabilitiesQuery(
                    new FacilityId(facilityId),
                    new ScheduleId(scheduleId),
                    startTime,
                    endTime
                ) :
                new GetAvailabilitiesQuery(
                    new FacilityId(facilityId),
                    new ScheduleId(scheduleId),
                    startTime,
                    endTime,
                    new EmployeeId(employeeId)
                ));

            return Ok(
                new CollectionResponse<AvailabilityDto>(result)
            );
        }

        [HttpPatch]
        [ProducesResponseType(typeof(int), (int)HttpStatusCode.OK)]
        [ProducesResponseType((int)HttpStatusCode.BadRequest)]
        public async Task<IActionResult> UpdateInPeriodOfTime(
            [FromRoute] Guid facilityId,
            [FromRoute] Guid scheduleId,
            [FromBody] UpdateAvailabilitiesInPeriodOfTimeRequest request)
        {
            var result = await mediator.Send(new UpdateAvailabilitiesInPeriodOfTimeCommand(
                new FacilityId(facilityId),
                new ScheduleId(scheduleId),
                request.DateFrom,
                request.DateTo,
                request.Availabilities
            ));

            if (!result.Success)
            {
                return NotFound();
            }

            return Ok(result.Result);
        }
    }
}
