using System;
using System.Text.Json.Serialization;
using Core.Domain;

namespace Enterprise.Facilities.Events
{
    public class FacilityInitialized : IEvent
    {
        public Guid FacilityId { get; }

        [JsonConstructor]
        public FacilityInitialized(Guid facilityId)
        {
            FacilityId = facilityId;
        }
    }
}
