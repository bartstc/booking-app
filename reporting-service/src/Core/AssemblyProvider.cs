using System;
using System.Reflection;

namespace Core
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
