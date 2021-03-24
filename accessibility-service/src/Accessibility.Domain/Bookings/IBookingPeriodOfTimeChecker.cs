using System;
using System.Threading.Tasks;
using Accessibility.Domain.SharedKernel;

namespace Accessibility.Domain.Bookings
{
    public interface IBookingPeriodOfTimeChecker
    {
        Task<bool> IsRecordAvailable(BookingId bookingId, FacilityId facilityId, EmployeeId employeeId, DateTime startDate, DateTime endDate);
    }
}
