using System.Threading.Tasks;

namespace Community.Application
{
    public interface IIdpUserService
    {
        Task CreateUserAsync(string email, string fullName, string password);
    }
}
