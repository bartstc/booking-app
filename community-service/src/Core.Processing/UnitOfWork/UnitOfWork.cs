using System.Threading;
using System.Threading.Tasks;
using Core.Domain.UnitOfWork;
using Marten;

namespace Core.Processing
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly IDocumentSession documentSession;

        public UnitOfWork(IDocumentSession documentSession)
        {
            this.documentSession = documentSession;
        }

        public async Task CommitAsync(CancellationToken cancellationToken = default(CancellationToken))
        {
            await documentSession.SaveChangesAsync(cancellationToken);
        }
    }
}
