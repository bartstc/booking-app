using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Accessibility.Application.Schedules;
using MediatR;
using Accessibility.Application.Facilities;
using Accessibility.Domain.Extensions;
using Accessibility.Application.Availabilities.Queries;

namespace Accessibility.Application.Bookings.Queries.GetAvailableBookingTerms
{
    public class GetAvailableBookingTermsQueryHandler : IRequestHandler<GetAvailableBookingTermsQuery, IEnumerable<AvailableBookingTermDto>>
    {
        private readonly IAvailabilityQueryRepository availabilityRepository;
        private readonly IBookingQueryRepository bookingRepository;
        private readonly IOfferQueryRepository offerRepository;

        public GetAvailableBookingTermsQueryHandler(IAvailabilityQueryRepository availabilityRepository, IBookingQueryRepository bookingRepository, IOfferQueryRepository offerRepository)
        {
            this.availabilityRepository = availabilityRepository;
            this.bookingRepository = bookingRepository;
            this.offerRepository = offerRepository;
        }

        public async Task<IEnumerable<AvailableBookingTermDto>> Handle(GetAvailableBookingTermsQuery request, CancellationToken cancellationToken)
        {
            var dateFrom = request.DateFrom > DateTime.Now ? request.DateFrom : DateTime.Now;
            var duration = await offerRepository.GetOfferDuration(request.FacilityId, request.OfferId);
            if (duration == 0)
            {
                throw new Exception("Offer not found.");
            }

            var availabilities = await availabilityRepository.GetAllAvailabilities(dateFrom, request.DateTo, request.FacilityId);
            var bookedTerms = await bookingRepository.GetBookedTerms(request.FacilityId, dateFrom, request.DateTo);
            var employeeIds = availabilities.Select(a => a.EmployeeId).Distinct().ToList(); // TODO: load employee ids from persisted storage after implementation of employee created event

            var employeeBookedTerms = bookedTerms.ToLookup(b => b.EmployeeId);

            var minutesChunk = 60 / request.BookingRules.HourChunkCount;
            var dateConst = dateFrom.Trim(TimeSpan.TicksPerHour);
            if (dateConst <= DateTime.Now)
            {
                dateConst = dateConst.AddMinutes(minutesChunk);
            }

            var dict = BuildTermDict(duration, availabilities, employeeBookedTerms, minutesChunk, dateConst);

            return BuildResultList(employeeIds, dict).OrderBy(d => d.Date);
        }

        private List<AvailableBookingTermDto> BuildResultList(List<Guid> employeeIds, Dictionary<DateTime, (List<Guid> available, List<UnavailableEmployee> unavailable)> dict)
        {
            var result = new List<AvailableBookingTermDto>();
            foreach (var termKeyValue in dict)
            {
                var term = termKeyValue.Value;

                if (!term.available.Any())
                {
                    continue;
                }

                if (employeeIds.Count > term.available.Count() + term.unavailable.Count())
                {
                    var termEmployees = term.available.Concat(term.unavailable.Select(u => u.EmployeeId));
                    term.unavailable.AddRange(employeeIds.Except(termEmployees).Select(employeeId => new UnavailableEmployee(employeeId)));
                }

                result.Add(new AvailableBookingTermDto(termKeyValue.Key, term.available, term.unavailable));
            }

            return result;
        }

        private Dictionary<DateTime, (List<Guid> available, List<UnavailableEmployee> unavailable)> BuildTermDict(short duration, IEnumerable<EmployeeAvailability> availabilities, ILookup<Guid, BookedTerm> employeeBookedTerms, int minutesChunk, DateTime dateConst)
        {
            var dict = new Dictionary<DateTime, (List<Guid> available, List<UnavailableEmployee> unavailable)>();

            foreach (var availability in availabilities)
            {
                if (availability.EndTime < dateConst.AddMinutes(duration))
                    continue;

                var date = dateConst >= availability.StartTime ? dateConst : availability.StartTime;
                var dateEnd = date.AddMinutes(duration);

                while (dateEnd <= availability.EndTime)
                {
                    AddToTermDict(employeeBookedTerms, dict, availability, date, dateEnd);

                    date = date.AddMinutes(minutesChunk);
                    dateEnd = date.AddMinutes(duration);
                }
            }

            return dict;
        }

        private void AddToTermDict(ILookup<Guid, BookedTerm> employeeBookedTerms, Dictionary<DateTime, (List<Guid> available, List<UnavailableEmployee> unavailable)> dict, EmployeeAvailability availability, DateTime date, DateTime dateEnd)
        {
            var bookedTerm = employeeBookedTerms[availability.EmployeeId].FirstOrDefault(e => (e.DateFrom, e.DateTo).HasCommonPeriod((date, dateEnd)));

            (List<Guid> available, List<UnavailableEmployee> unavailable) tuple;

            if (!dict.TryGetValue(date, out tuple))
            {
                tuple = (new List<Guid>(), new List<UnavailableEmployee>());
                dict[date] = tuple;
            }

            if (bookedTerm == null)
            {
                tuple.available.Add(availability.EmployeeId);
            }
            else
            {
                tuple.unavailable.Add(new UnavailableEmployee(availability.EmployeeId));
            }
        }
    }
}
