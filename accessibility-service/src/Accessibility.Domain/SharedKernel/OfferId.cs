using System;
using Core.Domain;

namespace Accessibility.Domain.SharedKernel
{
    public class OfferId : StronglyTypedIdBase
    {
        public OfferId(Guid value) : base(value)
        {
        }
    }
}
