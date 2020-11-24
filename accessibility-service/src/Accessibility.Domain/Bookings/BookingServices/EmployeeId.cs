using System;
using Accessibility.Domain.SeedWork;

namespace Accessibility.Domain.Bookings.BookingServices
{
    public class EmployeeId : StronglyTypedIdBase
    {
        public EmployeeId(Guid value) : base(value)
        {
        }
    }
}