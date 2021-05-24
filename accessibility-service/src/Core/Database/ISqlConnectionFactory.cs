using System;
using System.Data;

namespace Core.Database
{
    public interface ISqlConnectionFactory : IDisposable
    {
        IDbConnection GetConnection();
    }
}
