using System.Data;
using Core.Database;
using Npgsql;

namespace Core.Persistence.Postgres
{
    public class NpgsqlConnectionFactory : ISqlConnectionFactory
    {
        private readonly string connectionString;
        private IDbConnection connection; 

        public NpgsqlConnectionFactory(string connectionString)
        {
            this.connectionString = connectionString;
        }

        public IDbConnection GetConnection()
        {
            if (connection == null || connection.State != ConnectionState.Open)
            {
                connection = new NpgsqlConnection(connectionString);
                connection.Open();
            }
            return connection;
        }

        public void Dispose()
        {
            if (connection != null && connection.State == ConnectionState.Open)
                connection.Dispose();
        }
    }
}
