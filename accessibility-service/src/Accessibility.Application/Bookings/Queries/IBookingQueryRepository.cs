using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Accessibility.Application.Bookings.Queries.GetAvailableBookingDates;

namespace Accessibility.Application.Bookings.Queries
{
    public interface IBookingQueryRepository
    {
        Task<IEnumerable<BookedTerm>> GetBookedTerms(Guid facilityId, DateTime dateFrom, DateTime dateTo);
    }
}
