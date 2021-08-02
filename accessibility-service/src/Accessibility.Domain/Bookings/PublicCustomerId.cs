using System;
using Core.Domain;

namespace Accessibility.Domain.Bookings
{
    public class PublicCustomerId : StronglyTypedIdBase
    {
        public PublicCustomerId(Guid value) : base(value)
        {
        }
    }
}
