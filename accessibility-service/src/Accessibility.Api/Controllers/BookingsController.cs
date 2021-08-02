using System;
using System.Net;
using System.Threading.Tasks;
using Accessibility.Api.Bookings;
using Accessibility.Application.Bookings.Commands.CreateBooking;
using Accessibility.Application.Bookings.Queries.AnyUnfinishedBookingOfEmployee;
using Accessibility.Application.Bookings.Queries.AnyUnfinishedBookingOfOffer;
using Accessibility.Application.Bookings.Queries.GetBookingStatus;
using Accessibility.Domain.Bookings;
using Accessibility.Domain.SharedKernel;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Accessibility.Api.Controllers
{
    [ApiController]
    [Route("facilities/{facilityId}/bookings")]
    public class BookingsController : ControllerBase
    {
        private readonly IMediator mediator;

        public BookingsController(IMediator mediator)
        {
            this.mediator = mediator;
        }

        [HttpPost]
        [ProducesResponseType((int)HttpStatusCode.OK)]
        public async Task<IActionResult> CreateBooking(
            [FromRoute] Guid facilityId,
            [FromBody] CreateBookingRequest request,
            [FromQuery] bool isMadeManually = true
        )
        {
            var bookingId = await mediator.Send(new CreateBookingCommand(request.CustomerId, facilityId, request.BookedRecords, isMadeManually));
            return Ok();
        }

        [HttpGet("{bookingId}/status")]
        [ProducesResponseType(typeof(GetBookingStatusResponse), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> GetBookingStatus(
            [FromRoute] Guid facilityId,
            [FromRoute] Guid bookingId)
        {
            var result = await mediator.Send(new GetBookingStatusQuery(new BookingId(bookingId), new FacilityId(facilityId)));
            if (result.HasValue)
            {
                return Ok(new GetBookingStatusResponse(result.Value.ToString()));
            }
            
            return NotFound();
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
