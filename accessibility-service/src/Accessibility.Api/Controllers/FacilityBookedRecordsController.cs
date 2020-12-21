using System;
using System.Net;
using System.Threading.Tasks;
using Accessibility.Application.Bookings.AnyUnfinishedBookingOfEmployee;
using Accessibility.Application.Bookings.AnyUnfinishedBookingOfOffer;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Accessibility.Api.Controllers
{
    [ApiController]
    [Route("facilities/{facilityId}/booked-records")]
    public class FacilityBookedRecordsController : ControllerBase
    {
        private readonly IMediator mediator;

        public FacilityBookedRecordsController(IMediator mediator)
        {
            this.mediator = mediator;
        }

        [HttpHead("any-unfinished")]
        [ProducesResponseType((int) HttpStatusCode.OK)]
        public async Task<IActionResult> AnyUnfinishedBookedRecords(
            [FromRoute] Guid facilityId,
            [FromQuery] Guid offerId,
            [FromQuery] Guid employeeId)
        {
            if (offerId != Guid.Empty && employeeId == Guid.Empty)
            {
                if ((await mediator.Send(new AnyUnfinishedBookingOfOfferQuery(facilityId, offerId))))
                    return Ok();
            }
            else if (offerId == Guid.Empty && employeeId != Guid.Empty)
            {
                if (await mediator.Send(new AnyUnfinishedBookingOfEmployeeQuery(facilityId, employeeId)))
                    return Ok();
            }
            return NotFound();
        }
    }
}
