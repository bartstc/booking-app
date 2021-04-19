using System.Reflection;
using Accessibility.Application.Schedules.Commands.CreateSchedule;

namespace Accessibility.Infrastructure.Processing
{
    public static class Assemblies
    {
        public static Assembly Application = typeof(CreateScheduleCommand).Assembly;
    }
}
