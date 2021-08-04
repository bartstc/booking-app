using System;
using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;
using Accessibility.Api.BookedRecords;
using Accessibility.Application.BookedRecords.SetBookedRecordStatus;
using Accessibility.Application.Bookings.Queries.GetBookedRecordsOfFacility;
using Accessibility.Domain.Bookings.BookedRecords;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Accessibility.Api.Controllers
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

        [HttpPut("{bookingId}/records/{bookedRecordId}/cancel")]
        [ProducesResponseType((int)HttpStatusCode.OK)]
        public async Task<IActionResult> CancelBookedRecord(
            [FromRoute] Guid bookingId,
            [FromRoute] Guid facilityId,
            [FromRoute] Guid bookedRecordId,
            [FromBody] SetBookedRecordNotRealizedRequest request
        )
        {
            // TODO: depends on requesting user set status to CanceledByClient or CanceledByFacility
            await mediator.Send(new SetBookedRecordStatusCommand(
                bookingId,
                facilityId,
                bookedRecordId,
                BookedRecordStatus.CanceledByFacility,
                request?.Caution));

            return Ok();
        }

        [HttpPut("{bookingId}/records/{bookedRecordId}/set-not-realized")]
        [ProducesResponseType((int)HttpStatusCode.OK)]
        public async Task<IActionResult> SetBookedRecordAsNotRealized(
            [FromRoute] Guid bookingId,
            [FromRoute] Guid facilityId,
            [FromRoute] Guid bookedRecordId,
            [FromBody] SetBookedRecordNotRealizedRequest request
        )
        {
            await mediator.Send(new SetBookedRecordStatusCommand(
                bookingId,
                facilityId,
                bookedRecordId,
                BookedRecordStatus.NotRealized,
                request?.Caution));
            return Ok();
        }
        
        
        [HttpGet("records")]
        [ProducesResponseType(typeof(List<BookedRecordOfFacilityDto>), (int)HttpStatusCode.OK)]
        public async Task<CollectionResponse<BookedRecordOfFacilityDto>> GetBookedRecords(
            [FromRoute] Guid facilityId,
            [FromQuery] DateTime dateFrom,
            [FromQuery] DateTime dateTo
        )
        {
            return new CollectionResponse<BookedRecordOfFacilityDto>(
                await mediator.Send(new GetBookedRecordsOfFacilityQuery(facilityId, dateFrom, dateTo))
            );
        }
    }
}
