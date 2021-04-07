using System;
using System.Net;
using System.Threading.Tasks;
using Accessibility.Application.Schedules.Queries;
using Accessibility.Application.Schedules.Queries.GetAvailabilites;
using Accessibility.Domain.Schedules;
using Accessibility.Domain.SharedKernel;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Accessibility.Api.Controllers
{
    [ApiController]
    [Route("facilities/{facilityId}/schedules/{scheduleId}/[controller]")]
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
    }
}
