using System.Threading.Tasks;

namespace Community.Infrastructure.IdentityProvider.Auth0
{
    public interface IAuth0TokenService
    {
        string AccessToken { get; }

        // returns token expiration time in seconds
        Task<int> RefreshAccessTokenAsync();
    }
}
