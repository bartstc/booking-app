using System;
using System.Net;
using System.Threading.Tasks;
using Accessibility.Api.BookedRecords;
using Accessibility.Application.BookedRecords.Commands.SetBookedRecordStatus;
using Accessibility.Application.BookedRecords.Queries;
using Accessibility.Application.BookedRecords.Queries.GetBookedRecordsOfCustomer;
using Accessibility.Application.Bookings.Queries.GetBookedRecordsOfFacility;
using Accessibility.Domain.Bookings.BookedRecords;
using Core.Queries;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Accessibility.Api.Controllers
{
    [ApiController]
    public class BookedRecordsController : ControllerBase
    {
        private readonly IMediator mediator;

        public BookedRecordsController(IMediator mediator)
        {
            this.mediator = mediator;
        }

        [HttpPut("facilities/{facilityId}/bookings/{bookingId}/records/{bookedRecordId}/cancel")]
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

        [HttpPut("facilities/{facilityId}/bookings/{bookingId}/records/{bookedRecordId}/set-not-realized")]
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
        
        
        [HttpGet("facilities/{facilityId}/bookings/records")]
        [ProducesResponseType(typeof(QueryCollectionResult<BookedRecordOfFacilityDto>), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> GetBookedRecords(
            [FromRoute] Guid facilityId,
            [FromQuery] GetBookedRecordsOfFacilityQueryParams @params
        )
        {
            return Ok(await mediator.Send(new GetBookedRecordsOfFacilityQuery(facilityId, @params)));
        }

        [HttpGet("customers/{customerId}/bookings/records")]
        [ProducesResponseType(typeof(QueryCollectionResult<BookedRecordDto>), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> GetBookedRecords(
            [FromRoute] Guid customerId,
            [FromQuery] GetBookedRecordsOfCustomerQueryParams @params
        )
        {
            return Ok(await mediator.Send(new GetBookedRecordsOfCustomerQuery(customerId, @params)));
        }
    }
}
