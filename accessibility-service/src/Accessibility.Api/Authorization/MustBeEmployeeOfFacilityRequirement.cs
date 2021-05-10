using Microsoft.AspNetCore.Authorization;

namespace Accessibility.Api.Authorization
{
    public class MustBeEmployeeOfFacilityRequirement : IAuthorizationRequirement
    {
    }
}
