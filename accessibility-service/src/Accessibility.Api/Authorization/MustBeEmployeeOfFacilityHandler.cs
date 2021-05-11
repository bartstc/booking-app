using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;

namespace Accessibility.Api.Authorization
{
    public class MustBeEmployeeOfFacilityHandler : AuthorizationHandler<MustBeEmployeeOfFacilityRequirement>
    {
        private readonly IHttpContextAccessor httpContextAccessor;

        public MustBeEmployeeOfFacilityHandler(IHttpContextAccessor httpContextAccessor)
        {
            this.httpContextAccessor = httpContextAccessor;
        }

        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, MustBeEmployeeOfFacilityRequirement requirement)
        {
            var facilityId = httpContextAccessor.HttpContext.GetRouteValue("facilityId")?.ToString();

            var userFacility = context.User.Claims.FirstOrDefault(c => c.Type == "facilityId")?.Value;

            if (userFacility == null || facilityId != userFacility)
            {
                context.Fail();
                return Task.CompletedTask;
            }

            context.Succeed(requirement);
            return Task.CompletedTask;
        }
    }
}
