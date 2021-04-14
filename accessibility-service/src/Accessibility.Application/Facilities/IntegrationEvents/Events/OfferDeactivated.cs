using System;
using System.Text.Json.Serialization;
using Accessibility.Application.Facilities;

namespace Management.Facilities.Events
{
    public interface OfferDeactivated
    {
        OfferDeactivatedDto Dto { get; }
    }

    public interface OfferDeactivatedDto
    {
        Guid OfferId { get; }
        
        [JsonConverter(typeof(JsonStringEnumConverter))]
        EntityStatus Status { get; }
    }
}
