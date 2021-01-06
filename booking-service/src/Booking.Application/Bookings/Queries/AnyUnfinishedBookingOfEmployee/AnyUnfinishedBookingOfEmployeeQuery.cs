using System;
using MediatR;

namespace Booking.Application.Bookings.Queries.AnyUnfinishedBookingOfEmployee
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
