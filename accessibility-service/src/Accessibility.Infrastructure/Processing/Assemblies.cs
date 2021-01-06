using System.Reflection;
using Accessibility.Application.Schedules.Commands.CorrectSchedule;

namespace Accessibility.Infrastructure.Processing
{
    public static class Assemblies
    {
        public static Assembly Application = typeof(CorrectScheduleCommand).Assembly;
    }
}
