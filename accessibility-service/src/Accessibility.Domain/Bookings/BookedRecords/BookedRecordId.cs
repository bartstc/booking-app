using System;
using Accessibility.Domain.SeedWork;

namespace Accessibility.Domain.Bookings.BookedRecords
{
    public class BookedRecordId : StronglyTypedIdBase
    {
        public BookedRecordId(Guid value) : base(value)
        {
        }
    }
}
