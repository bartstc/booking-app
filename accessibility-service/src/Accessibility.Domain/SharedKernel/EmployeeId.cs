using System;
using Accessibility.Domain.SeedWork;

namespace Accessibility.Domain.SharedKernel
{
    public class EmployeeId : StronglyTypedIdBase
    {
        public EmployeeId(Guid value) : base(value)
        {
        }
    }
}