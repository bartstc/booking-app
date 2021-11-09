using System;
using System.Data;
using System.Threading.Tasks;
using Core.Database;
using Core.Marten.UnitOfWork;
using Marten;
using Marten.Services;
using Npgsql;

namespace Core.Processing.UnitOfWork
{
    public class TransactionalDocumentSessionFactory : ITransactionalDocumentSessionFactory, IDisposable
    {
        private readonly IDocumentStore store;
        private readonly IDbConnectionFactory dbConnectionFactory;
        private IDbTransaction transaction;

        public TransactionalDocumentSessionFactory(IDocumentStore store, IDbConnectionFactory dbConnectionFactory)
        {
            this.store = store;
            this.dbConnectionFactory = dbConnectionFactory;
        }

        public NpgsqlConnection DbConnection => dbConnectionFactory.GetConnection() as NpgsqlConnection;

        private IDocumentSession documentSession;
        public IDocumentSession DocumentSession
        {
            get
            {
                if (documentSession == null)
                {
                    if (transaction == null)
                        transaction = dbConnectionFactory.GetConnection().BeginTransaction();
                    
                    documentSession = store.OpenSession(new SessionOptions
                    {
                        Transaction = transaction as NpgsqlTransaction
                    });
                }

                return documentSession;
            }
        }

        public void Dispose()
        {
            if (documentSession != null)
                documentSession.Dispose();

            if (transaction != null)
                transaction.Dispose();
        }
    }
}
