using System.Reflection;

namespace Booking.Infrastructure.Processing
{
    public interface IAssemblyProvider
    {
        Assembly Application { get; }
    }
}