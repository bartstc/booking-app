using System;
using System.Net;
using System.Threading.Tasks;
using Accessibility.Application.Availabilities.Commands.UpdateInPeriodOfTime;
using Accessibility.Application.Availabilities.Queries;
using Accessibility.Application.Availabilities.Queries.GetAvailabilites;
using Core.Queries;
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
        [ProducesResponseType(typeof(QueryCollectionResult<AvailabilityDto>), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> Get(
            [FromRoute] Guid facilityId,
            [FromRoute] Guid scheduleId,
            [FromQuery] GetAvailabilitiesQueryParams @params)
        {
            var result = await mediator.Send(new GetAvailabilitiesQuery(facilityId, scheduleId, @params));

            return Ok(result);
        }

        [HttpPatch]
        [ProducesResponseType(typeof(int), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> UpdateInPeriodOfTime(
            [FromRoute] Guid facilityId,
            [FromRoute] Guid scheduleId,
            [FromBody] UpdateAvailabilitiesDto dto)
        {
            var result = await mediator.Send(new UpdateAvailabilitiesInPeriodOfTimeCommand(
                facilityId,
                scheduleId,
                dto
            ));

            return Ok();
        }
    }
}
