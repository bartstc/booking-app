using System.Threading.Tasks;
using Accessibility.Domain.SharedKernel;

namespace Accessibility.Domain.Schedules
{
    public interface IScheduleRepository
    {
        Task AddAsync(Schedule schedule);
        Task<Schedule> GetByIdAsync(ScheduleId scheduleId, FacilityId facilityId);
    }
}
