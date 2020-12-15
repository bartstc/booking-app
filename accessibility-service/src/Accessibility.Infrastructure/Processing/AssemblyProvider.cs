using System;
using System.Reflection;

namespace Accessibility.Infrastructure.Processing
{
    public class AssemblyProvider : IAssemblyProvider
    {
        public AssemblyProvider(Assembly application)
        {
            Application = application;
        }

        public Assembly Application { get; }
    }
}
