using System;
using System.Net;
using System.Threading.Tasks;
using Community.Api.Members;
using Community.Application.Members.Commands.CreateMember;
using Community.Application.Members.Queries.GetMemberArchivalBookings;
using Community.Application.Members.Queries.GetMemberByEmail;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Community.Api.Controllers
{
    [ApiController]
    [Route("members")]
    public class MembersController : ControllerBase
    {
        private readonly IMediator mediator;

        public MembersController(IMediator mediator)
        {
            this.mediator = mediator;
        }

        [HttpGet("{email}")]
        [ProducesResponseType((int)HttpStatusCode.NotFound)]
        [ProducesResponseType(typeof(MemberData), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> GetByEmail(
            [FromRoute] string email
        )
        {
            var result = await mediator.Send(new GetMemberByEmailQuery(email));

            if (result == null)
                return NotFound();
                
            return Ok(result);
        }


        [HttpPost]
        [ProducesResponseType((int)HttpStatusCode.OK)]
        public async Task<IActionResult> Create(
            [FromBody] CreateMemberCommand request
        )
        {
            await mediator.Send(request);
            return Ok();
        }

        [HttpGet("{memberId}/bookings")]
        [ProducesResponseType(typeof(GetMemberArchivalBookingsResponse), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> Bookings(
            [FromRoute] Guid memberId
        )
        {
            var result = await mediator.Send(new GetMemberArchivalBookingsQuery(memberId));
            return Ok(new GetMemberArchivalBookingsResponse(result));
        }
    }
}
