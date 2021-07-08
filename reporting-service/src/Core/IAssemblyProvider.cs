using System.Reflection;

namespace Core
{
    public interface IAssemblyProvider
    {
        Assembly Application { get; }
    }
}