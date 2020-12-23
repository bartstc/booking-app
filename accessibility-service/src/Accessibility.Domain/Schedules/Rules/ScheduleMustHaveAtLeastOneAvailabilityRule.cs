using System.Collections.Generic;
using System.Linq;
using Accessibility.Domain.Schedules.Availabilities;
using Accessibility.Domain.SeedWork;

namespace Accessibility.Domain.Schedules.Rules
{
    public class ScheduleMustHaveAtLeastOneAvailabilityRule : IBusinessRule
    {
        private readonly List<AvailabilityData> availabilities;

        public ScheduleMustHaveAtLeastOneAvailabilityRule(List<AvailabilityData> availabilities)
        {
            this.availabilities = availabilities;
        }
        public string Message => "Schedule must have at least one availability.";

        public bool IsBroken() =>
            availabilities == null || !availabilities.Any();
    }
}
