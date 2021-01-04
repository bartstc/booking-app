using System;
using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;
using Booking.Application.Bookings;
using Booking.Application.Bookings.AnyUnfinishedBookingOfEmployee;
using Booking.Application.Bookings.AnyUnfinishedBookingOfOffer;
using Booking.Application.Bookings.Book;
using Booking.Application.Bookings.GetBookedRecordsOfFacility;
using Booking.Application.Bookings.SetBookedRecordStatus;
using Booking.Domain.Bookings.BookedRecords;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Booking.Api.Controllers
{
    [ApiController]
    [Route("facilities/{facilityId}/bookings")]
    public class BookedRecordsController : ControllerBase
    {
        private readonly IMediator mediator;

        public BookedRecordsController(IMediator mediator)
        {
            this.mediator = mediator;
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
        
        
        [HttpGet("records")]
        [ProducesResponseType(typeof(List<BookedRecordOfFacilityDto>), (int)HttpStatusCode.OK)]
        public async Task<List<BookedRecordOfFacilityDto>> GetBookedRecords(
            [FromRoute] Guid facilityId,
            [FromQuery] DateTime dateFrom,
            [FromQuery] DateTime dateTo
        )
        {
            return await mediator.Send(new GetBookedRecordsOfFacilityQuery(facilityId, dateFrom, dateTo));
        }
    }
}
