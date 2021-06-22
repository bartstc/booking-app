using System;
using Core.Domain;

namespace Accessibility.Domain.Bookings.BookedRecords
{
    public class BookedRecordId : StronglyTypedIdBase
    {
        public BookedRecordId(Guid value) : base(value)
        {
        }
    }
}
