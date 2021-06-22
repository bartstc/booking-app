using System;
using Core.Domain;

namespace Accessibility.Domain.SharedKernel
{
    public class EmployeeId : StronglyTypedIdBase
    {
        public EmployeeId(Guid value) : base(value)
        {
        }
    }
}