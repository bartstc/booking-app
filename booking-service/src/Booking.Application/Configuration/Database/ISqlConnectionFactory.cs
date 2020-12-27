using System;
using System.Data;

namespace Booking.Application.Configuration.Database
{
    public interface ISqlConnectionFactory : IDisposable
    {
        IDbConnection GetConnection();
    }
}
