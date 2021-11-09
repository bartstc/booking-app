using System.Threading.Tasks;
using Auth0.AuthenticationApi;
using Auth0.AuthenticationApi.Models;
using Community.Infrastructure.Options;
using Microsoft.Extensions.Options;

namespace Community.Infrastructure.IdentityProvider.Auth0
{
    public class Auth0TokenService : IAuth0TokenService
    {
        private readonly IAuthenticationConnection authenticationConnection;
        private readonly Auth0Options auth0Options;

        public Auth0TokenService(
            IAuthenticationConnection authenticationConnection,
            IOptions<Auth0Options> auth0Options
        )
        {
            this.authenticationConnection = authenticationConnection;
            this.auth0Options = auth0Options.Value;
        }

        public string AccessToken { get; private set; }

        public async Task<int> RefreshAccessTokenAsync()
        {
            using (var authClient = new AuthenticationApiClient(auth0Options.Domain, authenticationConnection))
            {
                var tokenResponse = await authClient.GetTokenAsync(new ClientCredentialsTokenRequest
                {
                    Audience = auth0Options.Audience,
                    ClientId = auth0Options.ClientId,
                    ClientSecret = auth0Options.ClientSecret
                });

                AccessToken = tokenResponse.AccessToken;
                return tokenResponse.ExpiresIn;
            }
        }
    }
}
