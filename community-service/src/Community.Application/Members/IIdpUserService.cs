using System.Threading.Tasks;

namespace Community.Application.Members
{
    public interface IIdpUserService
    {
        Task CreateUserAsync(string email, string fullName, string password);
    }
}
