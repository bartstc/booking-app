using System;
using System.Net;
using System.Threading.Tasks;
using Accessibility.Api.Options;
using Accessibility.Application.Bookings;
using Accessibility.Application.Bookings.Queries.GetAvailableBookingTerms;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace Accessibility.Api.Controllers
{
    [ApiController]
    [Route("facilities/{facilityId}/bookings/terms")]
    public class BookingTermsController : ControllerBase
    {
        private readonly IMediator mediator;
        private readonly BookingRulesOptions bookingRulesOptions;

        public BookingTermsController(IMediator mediator, IOptions<BookingRulesOptions> options)
        {
            this.mediator = mediator;
            bookingRulesOptions = options.Value;
        }

        [HttpGet]
        [ProducesResponseType(typeof(CollectionResponse<AvailableBookingTermDto>), (int)HttpStatusCode.OK)]
        public async Task<CollectionResponse<AvailableBookingTermDto>> GetAvailableBookingTerms(
            [FromQuery] Guid facilityId,
            [FromQuery] Guid offerId,
            [FromQuery] DateTime dateFrom,
            [FromQuery] DateTime dateTo) =>
            new CollectionResponse<AvailableBookingTermDto>(await mediator.Send(new GetAvailableBookingTermsQuery(
                facilityId, offerId, dateFrom, dateTo, new BookingRulesData(
                    bookingRulesOptions.HourChunkCount,
                    bookingRulesOptions.UseBreakBetweenBookingsMechanism,
                    bookingRulesOptions.BreakBetweenBookings
                )
            )));
    }
}
