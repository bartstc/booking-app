using System.Net;
using System.Threading.Tasks;
using Accessibility.Application.Bookings;
using Microsoft.AspNetCore.Mvc;
using MediatR;
using Accessibility.Application.Bookings.Book;
using System;
using System.Collections.Generic;
using Accessibility.Application.Bookings.SetBookedRecordStatus;
using Accessibility.Domain.Bookings.BookedRecords;
using Accessibility.Application.Bookings.GetBookedRecordsOfFacility;
using Accessibility.Application.Bookings.AnyUnfinishedBookingOfOffer;
using Accessibility.Application.Bookings.AnyUnfinishedBookingOfEmployee;

namespace Accessibility.Api.Controllers
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
        [ProducesResponseType(typeof(BookingIdDto), (int)HttpStatusCode.Created)]
        public async Task<IActionResult> CreateBooking(
            [FromRoute] Guid customerId,
            [FromRoute] Guid facilityId,
            [FromBody] List<BookedRecordDto> services)
        {
            var bookingId = await mediator.Send(new BookCommand(customerId, facilityId, services));
            return Created("", bookingId);
        }

        [HttpPut("{bookingId}/records/{bookedRecordId}/fulfill")]
        [ProducesResponseType((int)HttpStatusCode.OK)]
        public async Task<IActionResult> FulfillBookedRecord(
            [FromRoute] Guid bookingId,
            [FromRoute] Guid bookedRecordId
        )
        {
            await mediator.Send(new SetBookedRecordStatusCommand(
                bookingId,
                bookedRecordId,
                BookedRecordStatus.Fulfilled));
            return Ok();
        }

        [HttpPut("{bookingId}/records/{bookedRecordId}/cancel")]
        [ProducesResponseType((int)HttpStatusCode.OK)]
        public async Task<IActionResult> CancelBookedRecord(
            [FromRoute] Guid bookingId,
            [FromRoute] Guid bookedRecordId
        )
        {
            await mediator.Send(new SetBookedRecordStatusCommand(
                bookingId,
                bookedRecordId,
                BookedRecordStatus.Canceled));
            return Ok();
        }

        [HttpPut("{bookingId}/records/{bookedRecordId}/set-not-realized")]
        [ProducesResponseType((int)HttpStatusCode.OK)]
        public async Task<IActionResult> SetBookedRecordAsNotRealized(
            [FromRoute] Guid bookingId,
            [FromRoute] Guid bookedRecordId
        )
        {
            await mediator.Send(new SetBookedRecordStatusCommand(
                bookingId,
                bookedRecordId,
                BookedRecordStatus.NotRealized));
            return Ok();
        }
        
        
        [HttpGet("{facilityId}/booked-records")]
        [ProducesResponseType(typeof(List<BookedRecordOfFacilityDto>), (int)HttpStatusCode.OK)]
        public async Task<List<BookedRecordOfFacilityDto>> GetBookedRecords(
            [FromRoute] Guid facilityId,
            [FromQuery] DateTime dateFrom,
            [FromQuery] DateTime dateTo
        )
        {
            return await mediator.Send(new GetBookedRecordsOfFacilityQuery(facilityId, dateFrom, dateTo));
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
