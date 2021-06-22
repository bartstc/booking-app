using System.Threading;
using System.Threading.Tasks;
using Accessibility.Infrastructure.Database;
using Core.Domain.UnitOfWork;
using Core.Processing;

namespace Accessibility.Infrastructure.Domain
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly IDomainEventsDispatcher domainEventsDispatcher;
        private readonly AccessibilityContext ctx;

        public UnitOfWork(IDomainEventsDispatcher domainEventsDispatcher, AccessibilityContext ctx)
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