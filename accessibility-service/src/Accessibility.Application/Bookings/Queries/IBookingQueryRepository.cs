using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Accessibility.Application.Bookings.Queries.GetAvailableBookingTerms;
using Accessibility.Domain.Bookings;
using Accessibility.Domain.SharedKernel;
using Core.Queries;

namespace Accessibility.Application.Bookings.Queries
{
    public interface IBookingQueryRepository
    {
        Task<IEnumerable<BookedTerm>> GetBookedTerms(Guid facilityId, DateTime dateFrom, DateTime dateTo);
        Task<int?> GetBookingStatus(BookingId id, FacilityId facilityId);
    }
}
