using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Accessibility.Application.Bookings.GetBookedRecordsOfFacility;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Accessibility.Api.Controllers
{
    [ApiController]
    [Route("facilities")]
    public class FacilitiesController : ControllerBase
    {
        private readonly IMediator mediator;

        public FacilitiesController(IMediator mediator)
        {
            this.mediator = mediator;
        }

        [HttpGet("{facilityId}/booked-records")]
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
