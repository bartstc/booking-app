using System.Net;
using System.Threading.Tasks;
using Accessibility.Application.Bookings;
using Microsoft.AspNetCore.Mvc;
using MediatR;
using Accessibility.Application.Bookings.Book;
using System;
using System.Collections.Generic;

namespace Accessibility.Api.Controllers
{

    [ApiController]
    [Route("[controller]")]
    public class BookingsController : ControllerBase
    {
        private readonly IMediator mediator;

        public BookingsController(IMediator mediator)
        {
            this.mediator = mediator;
        }

        // TODO: customerId from request JWT
        [HttpPost("{customerId}/{facilityId}")]
        [ProducesResponseType(typeof(BookingIdDto), (int)HttpStatusCode.Created)]
        public async Task<IActionResult> CreateBooking(
            [FromRoute] Guid customerId,
            [FromRoute] Guid facilityId,
            [FromBody] List<BookingServiceDto> services)
        {
            var bookingId = await mediator.Send(new BookCommand(customerId, facilityId, services));
            return Created("", bookingId);
        }
    }
}
