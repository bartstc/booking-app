using System.Threading.Tasks;
using Auth0.ManagementApi;
using Auth0.ManagementApi.Models;
using Community.Application.Members;
using Community.Infrastructure.IdentityProvider.Auth0;
using Community.Infrastructure.Options;
using Microsoft.Extensions.Options;

namespace Community.Infrastructure.Application.Members
{
    public class Auth0UserService : IIdpUserService
    {
        private readonly IManagementConnection managementConnection;
        private readonly IAuth0TokenService auth0TokenService;
        private readonly Auth0Options auth0Options;

        public Auth0UserService(
            IManagementConnection managementConnection,
            IAuth0TokenService auth0TokenService,
            IOptions<Auth0Options> auth0Options)
        {
            this.managementConnection = managementConnection;
            this.auth0TokenService = auth0TokenService;
            this.auth0Options = auth0Options.Value;
        }

        public async Task CreateUserAsync(string email, string fullName, string password)
        {
            using (var managementClient = new ManagementApiClient(
                auth0TokenService.AccessToken,
                auth0Options.Domain,
                managementConnection))
            {
                var user = await managementClient.Users.CreateAsync(new UserCreateRequest
                {
                    Email = email,
                    FullName = fullName,
                    Password = password,
                    Connection = auth0Options.DatabaseConnection
                });
            }
        }
    }
}
