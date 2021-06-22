using System.Threading;
using System.Threading.Tasks;
using Core.Domain.UnitOfWork;
using Microsoft.EntityFrameworkCore;

namespace Core.Processing
{
    public class UnitOfWork<TDbContext> : IUnitOfWork where TDbContext : DbContext
    {
        private readonly IDomainEventsDispatcher domainEventsDispatcher;
        private readonly TDbContext ctx;

        public UnitOfWork(IDomainEventsDispatcher domainEventsDispatcher, TDbContext ctx)
        {
            this.domainEventsDispatcher = domainEventsDispatcher;
            this.ctx = ctx;
        }

        public async Task<int> CommitAsync(CancellationToken cancellationToken = default(CancellationToken))
        {
            await domainEventsDispatcher.DispatchAsync();
            return await ctx.SaveChangesAsync(cancellationToken);
        }
    }
}
