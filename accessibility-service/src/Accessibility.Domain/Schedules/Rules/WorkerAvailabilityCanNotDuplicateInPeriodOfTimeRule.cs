using System.Collections.Generic;
using System.Linq;
using Accessibility.Domain.Schedules.Availabilities;
using Accessibility.Domain.SeedWork;

namespace Accessibility.Domain.Schedules.Rules
{
    public class WorkerAvailabilityCanNotDuplicateInPeriodOfTimeRule : IBusinessRule
    {
        private readonly IEnumerable<AvailabilityData> availabilities;
        private AvailabilityData incorrectAvailability;

        public WorkerAvailabilityCanNotDuplicateInPeriodOfTimeRule(IEnumerable<AvailabilityData> availabilities)
        {
            this.availabilities = availabilities;
        }

        public string Message => $"Employee can not have more than one record in the same period of time in rage of one schedule. ({incorrectAvailability.EmployeeId.Value})";

        public bool IsBroken()
        {
            foreach (var workerGroup in availabilities.GroupBy(a => a.EmployeeId))
            {
                int skipCount = 1;

                foreach (var availability in workerGroup)
                {
                    if (workerGroup
                        .Skip(skipCount)
                        .Any(a => a.PeriodOfTime.HasCommonPeriodWithEdges(availability.PeriodOfTime)))
                    {
                        incorrectAvailability = availability;
                        return true;
                    }
                    
                    skipCount++;
                }
            }

            return false;
        }
    }
}
