using System;
using Core.Domain;
using Accessibility.Domain.SharedKernel;

namespace Accessibility.Domain.Schedules.Rules
{
    public class ModifiedSchedulePeriodOfTimeMustBeAvailableRule : IBusinessRule
    {
        private readonly ISchedulePeriodOfTimeChecker schedulePeriodOfTimeChecker;
        private readonly FacilityId facilityId;
        private readonly ScheduleId scheduleId;
        private readonly DateTime startDate;
        private readonly DateTime endDate;

        public ModifiedSchedulePeriodOfTimeMustBeAvailableRule(
            ISchedulePeriodOfTimeChecker schedulePeriodOfTimeChecker,
            FacilityId facilityId,
            ScheduleId scheduleId,
            DateTime startDate,
            DateTime endDate
        )
        {
            this.schedulePeriodOfTimeChecker = schedulePeriodOfTimeChecker;
            this.facilityId = facilityId;
            this.scheduleId = scheduleId;
            this.startDate = startDate;
            this.endDate = endDate;
        }

        public string Message => "The schedule already exists in the given period of time.";

        public bool IsBroken() =>
            !schedulePeriodOfTimeChecker.IsAvailableForModify(facilityId, scheduleId, startDate, endDate);
    }
}
