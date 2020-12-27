using System;
using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;
using Booking.Application.Bookings;
using Booking.Application.Bookings.Book;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Booking.Api.Controllers
{
    [ApiController]
    [Route("bookings")]
    public class BookingsController : ControllerBase
    {
        private readonly IMediator mediator;

        public BookingsController(IMediator mediator)
        {
            this.mediator = mediator;
        }

        // TODO: customerId from request JWT
        [HttpPost("{customerId}/{facilityId}")]
        [ProducesResponseType(typeof(BookingIdDto), (int)HttpStatusCode.Accepted)]
        public async Task<IActionResult> CreateBooking(
            [FromRoute] Guid customerId,
            [FromRoute] Guid facilityId,
            [FromBody] List<BookedRecordDto> services)
        {
            var bookingId = await mediator.Send(new BookCommand(customerId, facilityId, services));
            return Accepted();
        }
    }
}
