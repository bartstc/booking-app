using System;
using MediatR;

namespace Accessibility.Application.Bookings.AnyUnfinishedBookingOfEmployee
{
    public class AnyUnfinishedBookingOfEmployeeQuery : IRequest<bool>
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
