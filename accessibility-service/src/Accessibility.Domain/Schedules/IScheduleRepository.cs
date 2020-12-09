using System.Threading.Tasks;

namespace Accessibility.Domain.Schedules
{
    public interface IScheduleRepository
    {
        Task AddAsync(Schedule schedule);
    }
}
