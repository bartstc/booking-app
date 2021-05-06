using System.Security.Claims;

namespace IdentityServer.Data
{
    public static class UserClaimExtensions
    {
        public static Claim ToClaim(this ContextTypeClaimValues claim) =>
            new Claim("contextType", claim.ToString());
    }

    public enum ContextTypeClaimValues
    {
        employee,
        customer
    }
}
