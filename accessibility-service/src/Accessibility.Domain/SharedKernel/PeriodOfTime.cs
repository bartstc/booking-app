using System;
using System.Collections.Generic;
using Accessibility.Domain.Extensions;
using Accessibility.Domain.SeedWork;

namespace Accessibility.Domain.SharedKernel
{
    public class PeriodOfTime : ValueObject
    {
        public PeriodOfTime(DateTime dateFrom, DateTime dateTo)
        {
            // rule to check if DateTo is greater than DateFrom ?
            DateFrom = dateFrom;
            DateTo = dateTo;
        }

        public DateTime DateFrom { get; internal set; }
        public DateTime DateTo { get; internal set; }

        public bool HasCommonPeriod(PeriodOfTime period) =>
            (DateFrom, DateTo).HasCommonPeriod((period.DateFrom, period.DateTo));
            
        public bool HasCommonPeriodWithEdges(PeriodOfTime period) =>
            (DateFrom, DateTo).HasCommonPeriodWithEdges((period.DateFrom, period.DateTo));

        public bool IsInRange(PeriodOfTime period) =>
            DateFrom >= period.DateFrom && DateTo <= period.DateTo;

        protected override IEnumerable<object> GetEqualityComponents() =>
            new List<object> { DateFrom, DateTo };
    }
}
