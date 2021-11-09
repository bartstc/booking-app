using System.Threading;
using System.Threading.Tasks;
using Core.Domain.UnitOfWork;
using Core.Marten.UnitOfWork;
using Core.Processing.DomainEventDispatcher;
using Marten;

namespace Core.Processing.UnitOfWork
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly ITransactionalDocumentSessionFactory dbConnectionFactory;
        private readonly IDocumentSession session;
        private readonly IDomainEventsDispatcher domainEventsDispatcher;

        public UnitOfWork(
            ITransactionalDocumentSessionFactory dbConnectionFactory,
            IDomainEventsDispatcher domainEventsDispatcher)
        {
            this.dbConnectionFactory = dbConnectionFactory;
            this.session = dbConnectionFactory.DocumentSession;
            this.domainEventsDispatcher = domainEventsDispatcher;
        }

        public async Task CommitAsync(CancellationToken cancellationToken = default(CancellationToken))
        {
            await domainEventsDispatcher.DispatchAsync();
            await session.SaveChangesAsync();
        }
    }
}
