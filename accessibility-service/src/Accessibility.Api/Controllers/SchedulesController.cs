using System;
using System.Net;
using System.Threading.Tasks;
using Accessibility.Api.Schedules;
using Accessibility.Application.Schedules.CorrectSchedule;
using Accessibility.Application.Schedules.CreateSchedule;
using Accessibility.Application.Schedules.GetScheduleById;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Accessibility.Api.Controllers
{
    [ApiController]
    [Route("facilities")]
    public class SchedulesController : ControllerBase
    {
        private readonly IMediator mediator;

        public SchedulesController(IMediator mediator)
        {
            this.mediator = mediator;
        }

        [HttpGet("{facilityId}/schedules/{scheduleId}")]
        [ProducesResponseType(typeof(ScheduleDto), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> GetScheduleById(
            [FromRoute] Guid scheduleId
        )
        {
            var schedule = await mediator.Send(new GetScheduleByIdQuery(scheduleId));
            return Ok(schedule);
        }

        [HttpPost("{facilityId}/schedules")]
        [ProducesResponseType(typeof(Guid), (int)HttpStatusCode.Created)]
        public async Task<IActionResult> CreateSchedule(
            [FromRoute] Guid facilityId,
            [FromBody] CreateScheduleRequest request
        )
        {
            var id = await mediator.Send(new CreateScheduleCommand(facilityId, request.Name, request.StartDate, request.EndDate, request.Availabilities, request.CreatorId));
            return Created(string.Empty, id);
        }

        [HttpPut("{facilityId}/schedules/{scheduleId}")]
        [ProducesResponseType((int)HttpStatusCode.OK)]
        public async Task<IActionResult> CorrectSchedule(
            [FromRoute] Guid facilityId,
            [FromRoute] Guid scheduleId,
            [FromBody] CorrectScheduleRequest request
        )
        {
            await mediator.Send(new CorrectScheduleCommand(facilityId, scheduleId, request.Availabilities));
            return Ok();
        }
    }
}