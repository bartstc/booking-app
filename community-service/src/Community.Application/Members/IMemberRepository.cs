using System.Threading.Tasks;

namespace Community.Application.Members
{
    public interface IMemberRepository
    {
        Task<bool> ExistsAsync(string email);
    }
}
