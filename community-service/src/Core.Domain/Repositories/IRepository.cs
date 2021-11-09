using System;
using System.Threading;
using System.Threading.Tasks;

namespace Core.Domain.Repositories
{
    public interface IRepository<TAggregate> where TAggregate : IAggregate
    {
        void Store(TAggregate aggregate, CancellationToken cancellationToken);
        Task<TAggregate> FindAsync(Guid id, CancellationToken cancellationToken);
        Task SaveChangesAsync();
    }
}
