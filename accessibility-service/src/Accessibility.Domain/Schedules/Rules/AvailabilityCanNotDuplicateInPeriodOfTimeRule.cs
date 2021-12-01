using System.Collections.Generic;
using System.Linq;
using Accessibility.Domain.SharedKernel;
using Core.Domain;

namespace Accessibility.Domain.Schedules.Rules
{
    public class AvailabilityCanNotDuplicateInPeriodOfTimeRule : IBusinessRule
    {
        private readonly IEnumerable<PeriodOfTime> availabilities;

        public AvailabilityCanNotDuplicateInPeriodOfTimeRule(IEnumerable<PeriodOfTime> availabilities)
        {
            this.availabilities = availabilities;
        }

        public string Message => $"Employee can not have more than one record in the same period of time in rage of one schedule.";

        public bool IsBroken()
        {
            int skipCount = 1;

            foreach (var availability in availabilities)
            {
                if (availabilities
                    .Skip(skipCount)
                    .Any(a => a.HasCommonPeriodWithEdges(availability)))
                {
                    return true;
                }

                skipCount++;
            }

            return false;
        }
    }
}
