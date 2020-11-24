using System.Net;
using System.Threading.Tasks;
using Accessibility.Application.Bookings;
using Microsoft.AspNetCore.Mvc;
using MediatR;

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

        [HttpPost]
        [ProducesResponseType(typeof(BookingIdDto), (int)HttpStatusCode.Created)]
        public async Task<IActionResult> CreateBooking([FromBody] BookingServiceDto booking)
        {
            var bookingId = await mediator.Send(new CreateBookingCommand(booking));
            return Created("", bookingId);
        }
    }
}
