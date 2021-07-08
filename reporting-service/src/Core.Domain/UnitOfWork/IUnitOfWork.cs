using System.Threading;
using System.Threading.Tasks;

namespace Core.Domain.UnitOfWork
{
    public interface IUnitOfWork
    {
        Task CommitAsync(CancellationToken cancellationToken = default);
    }
}