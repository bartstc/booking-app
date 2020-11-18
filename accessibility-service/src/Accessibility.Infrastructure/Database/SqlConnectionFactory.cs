using System.Data;
using Accessibility.Application.Configuration.Database;
using Npgsql;

namespace Accessibility.Infrastructure.Database
{
    public class SqlConnectionFactory : ISqlConnectionFactory
    {
        private readonly string connectionString;
        private IDbConnection connection; 

        public SqlConnectionFactory(string connectionString)
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