using System.Collections.Generic;
using System.Linq;
using Core.Domain;
using Accessibility.Domain.SharedKernel;

namespace Accessibility.Domain.Schedules.Rules
{
    public class OverridenAvailabilitiesMustFitPeriodOfTimeRule : IBusinessRule
    {
        private readonly PeriodOfTime periodOfTime;
        private readonly IEnumerable<PeriodOfTime> availabilities;

        public OverridenAvailabilitiesMustFitPeriodOfTimeRule(PeriodOfTime periodOfTime, IEnumerable<PeriodOfTime> availabilities)
        {
            this.periodOfTime = periodOfTime;
            this.availabilities = availabilities;
        }

        public string Message => "Not all availabilities are within specified period of time.";

        public bool IsBroken() =>
            availabilities.Any(a => !a.IsInRange(periodOfTime));
    }
}
