using System;
using Core.Domain;
using Accessibility.Domain.SharedKernel;

namespace Accessibility.Domain.Schedules.Rules
{
    public class NewSchedulePeriodOfTimeMustBeAvailableRule : IBusinessRule
    {
        private readonly ISchedulePeriodOfTimeChecker schedulePeriodOfTimeChecker;
        private readonly FacilityId facilityId;
        private readonly DateTime startDate;
        private readonly DateTime endDate;

        public NewSchedulePeriodOfTimeMustBeAvailableRule(
            ISchedulePeriodOfTimeChecker schedulePeriodOfTimeChecker,
            FacilityId facilityId,
            DateTime startDate,
            DateTime endDate)
        {
            this.schedulePeriodOfTimeChecker = schedulePeriodOfTimeChecker;
            this.facilityId = facilityId;
            this.startDate = startDate;
            this.endDate = endDate;
        }

        public string Message => "The schedule already exists in the given period of time.";

        public bool IsBroken() =>
            !schedulePeriodOfTimeChecker.IsAvailable(facilityId, startDate, endDate);
    }
}
