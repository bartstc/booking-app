using Marten;
using Npgsql;

namespace Core.Marten.UnitOfWork
{
    public interface ITransactionalDocumentSessionFactory
    {
        IDocumentSession DocumentSession { get; }
        NpgsqlConnection DbConnection { get; }
    }
}
