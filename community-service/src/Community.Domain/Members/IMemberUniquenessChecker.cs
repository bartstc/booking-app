using System.Threading.Tasks;

namespace Community.Domain.Members
{
    public interface IMemberUniquenessChecker
    {
        Task<bool> IsUnique(string email);
    }
}
