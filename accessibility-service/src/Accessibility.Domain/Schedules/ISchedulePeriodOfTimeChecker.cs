using System;
using Accessibility.Domain.SharedKernel;

namespace Accessibility.Domain.Schedules
{
    public interface ISchedulePeriodOfTimeChecker
    {
        bool IsAvailable(FacilityId facilityId, DateTime startDate, DateTime endDate);
        bool IsAvailableForModify(FacilityId facilityId, ScheduleId scheduleId, DateTime startDate, DateTime endDate);
    }
}
