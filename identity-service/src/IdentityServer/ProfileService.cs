using System;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using IdentityModel;
using IdentityServer.Areas.Identity.Data;
using IdentityServer4.Extensions;
using IdentityServer4.Models;
using IdentityServer4.Services;
using Microsoft.AspNetCore.Identity;

namespace IdentityServer
{
    public class ProfileService : IProfileService
    {
        private readonly UserManager<IdentityServerUser> userManager;
        private readonly RoleManager<IdentityRole> roleManager;
        private readonly IUserClaimsPrincipalFactory<IdentityServerUser> userClaimsPrincipalFactory;

        public ProfileService(UserManager<IdentityServerUser> userManager, RoleManager<IdentityRole> roleManager, IUserClaimsPrincipalFactory<IdentityServerUser> userClaimsPrincipalFactory)
        {
            this.userManager = userManager;
            this.roleManager = roleManager;
            this.userClaimsPrincipalFactory = userClaimsPrincipalFactory;
        }

        public async Task GetProfileDataAsync(ProfileDataRequestContext context)
        {
            var subId = context.Subject.GetSubjectId();
            var user = await userManager.FindByIdAsync(subId);
            var userClaims = await userClaimsPrincipalFactory.CreateAsync(user);

            var claims = userClaims.Claims.ToList();
            claims = claims.Where(claim => context.RequestedClaimTypes.Contains(claim.Type)).ToList();

            if (userManager.SupportsUserRole)
            {
                var roles = await userManager.GetRolesAsync(user);
                foreach (var roleName in roles)
                {
                    claims.Add(new Claim(JwtClaimTypes.Role, roleName));
                    if (roleManager.SupportsRoleClaims)
                    {
                        var role = await roleManager.FindByNameAsync(roleName);
                        if (role != null)
                            claims.AddRange(await roleManager.GetClaimsAsync(role));
                    }
                }
            }

            context.IssuedClaims = claims;
        }

        public async Task IsActiveAsync(IsActiveContext context)
        {
            var subId = context.Subject.GetSubjectId();
            var user = await userManager.FindByIdAsync(subId);
            context.IsActive = user != null;
        }
    }
}
