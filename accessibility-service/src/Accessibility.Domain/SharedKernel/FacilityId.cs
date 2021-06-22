using System;
using Core.Domain;

namespace Accessibility.Domain.SharedKernel
{
    public class FacilityId : StronglyTypedIdBase
    {
        public FacilityId(Guid value) : base(value)
        {
        }
    }
}
