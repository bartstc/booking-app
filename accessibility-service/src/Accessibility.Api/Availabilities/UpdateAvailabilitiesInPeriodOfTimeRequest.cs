using System;
using System.Collections.Generic;
using Accessibility.Application.Availabilities.Commands;

namespace Accessibility.Api.Availabilities
{
    public class UpdateAvailabilitiesInPeriodOfTimeRequest
    {
        public DateTime DateFrom { get; set; }
        public DateTime DateTo { get; set; }
        public IEnumerable<AvailabilityDto> Availabilities { get; set; }
    }
}
