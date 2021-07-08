using System;
using Core.Queries;

namespace Accessibility.Application.Bookings.Queries.AnyUnfinishedBookingOfEmployee
{
    public class AnyUnfinishedBookingOfEmployeeQuery : IQuery<bool>
    {
        public AnyUnfinishedBookingOfEmployeeQuery(Guid facilityId, Guid employeeId)
        {
            FacilityId = facilityId;
            EmployeeId = employeeId;
        }

        public Guid FacilityId { get; }
        public Guid EmployeeId { get; }
    }
}
