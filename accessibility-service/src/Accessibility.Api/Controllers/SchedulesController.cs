using System;
using System.Net;
using System.Threading.Tasks;
using Accessibility.Api.Schedules;
using Accessibility.Application.Schedules.Commands.CreateSchedule;
using Accessibility.Application.Schedules.Commands.ModifySchedule;
using Accessibility.Application.Schedules.Queries;
using Accessibility.Application.Schedules.Queries.GetScheduleById;
using Accessibility.Application.Schedules.Queries.GetSchedules;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Accessibility.Api.Controllers
{
    [ApiController]
    [Route("facilities/{facilityId}/schedules")]
    [Authorize("MustBeEmployeeOfFacility")]
    public class SchedulesController : ControllerBase
    {
        private readonly IMediator mediator;

        public SchedulesController(IMediator mediator)
        {
            this.mediator = mediator;
        }

        [HttpGet]
        [ProducesResponseType(typeof(CollectionResponse<ScheduleDto>), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> GetSchedules(
            [FromRoute] Guid facilityId,
            [FromQuery] DateTime? dateFrom,
            [FromQuery] DateTime? dateTo)
        {
            var schedules = await mediator.Send(new GetSchedulesQuery(facilityId, dateFrom, dateTo));
            return Ok(new CollectionResponse<ScheduleDto>(schedules));
        }

        [HttpGet("{scheduleId}")]
        [ProducesResponseType(typeof(ScheduleDto), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> GetScheduleById(
            [FromRoute] Guid scheduleId
        )
        {
            var schedule = await mediator.Send(new GetScheduleByIdQuery(scheduleId));
            return Ok(schedule);
        }

        [HttpPost]
        [ProducesResponseType(typeof(Guid), (int)HttpStatusCode.Created)]
        public async Task<IActionResult> CreateSchedule(
            [FromRoute] Guid facilityId,
            [FromBody] CreateScheduleRequest request
        )
        {
            var id = await mediator.Send(new CreateScheduleCommand(facilityId, request.Name, request.StartDate, request.EndDate, request.CreatorId));
            return Created(string.Empty, id);
        }

        [HttpPut("{scheduleId}")]
        [ProducesResponseType(typeof(Guid), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> ModifySchedule(
            [FromRoute] Guid facilityId,
            [FromRoute] Guid scheduleId,
            [FromBody] CreateScheduleRequest request)
        {
            var id = await mediator.Send(new ModifyScheduleCommand(facilityId, scheduleId, request.Name, request.StartDate, request.EndDate, request.CreatorId));
            return Ok(id);
        }

        // [HttpPatch("{scheduleId}")]
        // [ProducesResponseType((int)HttpStatusCode.OK)]
        // public async Task<IActionResult> CorrectSchedule(
        //     [FromRoute] Guid facilityId,
        //     [FromRoute] Guid scheduleId,
        //     [FromBody] CorrectScheduleRequest request
        // )
        // {
        //     await mediator.Send(new ApplyCorrectionCommand(facilityId, scheduleId, request.Availabilities));
        //     return Ok();
        // }
    }
}
