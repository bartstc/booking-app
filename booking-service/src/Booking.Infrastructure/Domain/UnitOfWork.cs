using System;
using System.Threading;
using System.Threading.Tasks;
using Booking.Domain.SeedWork;
using Booking.Infrastructure.Database;
using Booking.Infrastructure.Processing;

namespace Booking.Infrastructure.Domain
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly IDomainEventsDispatcher domainEventsDispatcher;
        private readonly BookingContext ctx;

        public UnitOfWork(IDomainEventsDispatcher domainEventsDispatcher, BookingContext ctx)
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
