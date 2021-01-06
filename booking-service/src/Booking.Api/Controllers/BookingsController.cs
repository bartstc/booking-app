using System;
using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;
using Booking.Application.Bookings;
using Booking.Application.Bookings.AnyUnfinishedBookingOfEmployee;
using Booking.Application.Bookings.AnyUnfinishedBookingOfOffer;
using Booking.Application.Bookings.Book;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Booking.Api.Controllers
{
    [ApiController]
    [Route("facilities/{facilityId}")]
    public class BookingsController : ControllerBase
    {
        private readonly IMediator mediator;

        public BookingsController(IMediator mediator)
        {
            this.mediator = mediator;
        }

        // TODO: customerId from request JWT
        [HttpPost("customers/{customerId}/bookings")]
        [ProducesResponseType(typeof(BookingIdDto), (int)HttpStatusCode.Accepted)]
        public async Task<IActionResult> CreateBooking(
            [FromRoute] Guid customerId,
            [FromRoute] Guid facilityId,
            [FromBody] List<BookedRecordDto> services)
        {
            var bookingId = await mediator.Send(new BookCommand(customerId, facilityId, services));
            return Accepted();
        }

        [HttpHead("bookings/any-unfinished")]
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
