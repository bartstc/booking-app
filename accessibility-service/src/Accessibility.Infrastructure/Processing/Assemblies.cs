using System.Reflection;
using Accessibility.Application.Schedules.Commands.ApplyCorrection;

namespace Accessibility.Infrastructure.Processing
{
    public static class Assemblies
    {
        public static Assembly Application = typeof(ApplyCorrectionCommand).Assembly;
    }
}
