using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Accessibility.Application.Schedules
{
    public interface IScheduleQueryRepository
    {
        Task<IEnumerable<EmployeeAvailability>> GetAllAvailabilities(DateTime dateFrom, DateTime dateTo, Guid facilityId);
    }
}
