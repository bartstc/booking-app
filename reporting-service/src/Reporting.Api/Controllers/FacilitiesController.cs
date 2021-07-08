using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using MediatR;
using Reporting.Api.Facilities;
using Enterprise.Facilities.Commands.ConfirmBooking;
using Enterprise.Facilities.Queries.GetFacilityOfferReport;

namespace Reporting.Api.Controllers
{
    [ApiController]
    [Route("[controller]/{facilityId}")]
    public class FacilitiesController : ControllerBase
    {
        private readonly IMediator mediator;

        public FacilitiesController(IMediator mediator)
        {
            this.mediator = mediator;
        }

        [HttpGet]
        public async Task<IActionResult> Get(
            [FromRoute] Guid facilityId
        )
        {
            var result = await mediator.Send(new GetFacilityOfferReportQuery(facilityId));

            return Ok(result);
        }

        [HttpPost("bookings/confirmed")]
        public async Task<IActionResult> Post(
            [FromRoute] Guid facilityId,
            [FromBody] ConfirmBookingRequest request
        )
        {
            await mediator.Send(new ConfirmBookingCommand(facilityId, request.Offers, request.CustomerId));

            return Ok();
        }
    }
}
