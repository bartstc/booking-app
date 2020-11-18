using System;
using System.Data;

namespace Accessibility.Application.Configuration.Database
{
    public interface ISqlConnectionFactory : IDisposable
    {
        IDbConnection GetConnection();
    }
}
