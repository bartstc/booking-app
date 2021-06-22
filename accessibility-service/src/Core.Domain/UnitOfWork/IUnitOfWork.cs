using System.Threading;
using System.Threading.Tasks;

namespace Core.Domain.UnitOfWork
{
    public interface IUnitOfWork
    {
        Task<int> CommitAsync(CancellationToken cancellationToken = default);
    }
}