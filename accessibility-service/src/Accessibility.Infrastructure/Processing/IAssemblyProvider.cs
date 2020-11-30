using System.Reflection;

namespace Accessibility.Infrastructure.Processing
{
    public interface IAssemblyProvider
    {
        Assembly Application { get; }
    }
}