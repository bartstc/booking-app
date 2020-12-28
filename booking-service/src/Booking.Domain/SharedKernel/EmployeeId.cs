using System;
using Booking.Domain.SeedWork;

namespace Booking.Domain.SharedKernel
{
    public class EmployeeId : StronglyTypedIdBase
    {
        public EmployeeId(Guid value) : base(value)
        {
        }
    }
}