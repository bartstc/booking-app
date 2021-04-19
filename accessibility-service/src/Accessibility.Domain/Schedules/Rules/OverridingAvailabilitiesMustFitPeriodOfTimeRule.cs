using System.Collections.Generic;
using System.Linq;
using Accessibility.Domain.Schedules.Availabilities;
using Accessibility.Domain.SeedWork;
using Accessibility.Domain.SharedKernel;

namespace Accessibility.Domain.Schedules.Rules
{
    public class OverridingAvailabilitiesMustFitPeriodOfTimeRule : IBusinessRule
    {
        private readonly PeriodOfTime periodOfTime;
        private readonly IEnumerable<AvailabilityData> availabilities;

        public OverridingAvailabilitiesMustFitPeriodOfTimeRule(PeriodOfTime periodOfTime, IEnumerable<AvailabilityData> availabilities)
        {
            this.periodOfTime = periodOfTime;
            this.availabilities = availabilities;
        }

        public string Message => "Not all availabilities are within specified period of time.";

        public bool IsBroken() =>
            availabilities.Any(a => !a.PeriodOfTime.IsInRange(periodOfTime));
    }
}
