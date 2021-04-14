using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Accessibility.Application.Schedules;
using Accessibility.Domain.Schedules;
using Accessibility.Domain.SharedKernel;

namespace Accessibility.Application.Availabilities.Queries
{
    public interface IAvailabilityQueryRepository
    {
        Task<IEnumerable<EmployeeAvailability>> GetAllAvailabilities(DateTime dateFrom, DateTime dateTo, Guid facilityId);
        Task<IEnumerable<AvailabilityDto>> GetAvailabilities(FacilityId facilityId, ScheduleId scheduleId, DateTime startTime, DateTime endTime);
        Task<IEnumerable<AvailabilityDto>> GetAvailabilities(FacilityId facilityId, ScheduleId scheduleId, DateTime startTime, DateTime endTime, EmployeeId employeeId);
    }
}
