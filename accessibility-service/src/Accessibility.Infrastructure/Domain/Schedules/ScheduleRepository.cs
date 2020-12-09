using System.Threading.Tasks;
using Accessibility.Domain.Schedules;
using Accessibility.Infrastructure.Database;

namespace Accessibility.Infrastructure.Domain.Schedules
{
    public class ScheduleRepository : IScheduleRepository
    {
        private readonly AccessibilityContext ctx;

        public ScheduleRepository(AccessibilityContext ctx)
        {
            this.ctx = ctx;
        }

        public async Task AddAsync(Schedule schedule)
        {
            await ctx.AddAsync(schedule);
        }
    }
}
