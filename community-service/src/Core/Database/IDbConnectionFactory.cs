using System;
using System.Data;

namespace Core.Database
{
    public interface IDbConnectionFactory : IDisposable
    {
        IDbConnection GetConnection();
    }
}
