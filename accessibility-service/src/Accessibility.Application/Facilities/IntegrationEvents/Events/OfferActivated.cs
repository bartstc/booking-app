using System;
using System.Text.Json.Serialization;
using Accessibility.Application.Facilities;

namespace Management.Facilities.Events
{
    public interface OfferActivated
    {
        OfferActivatedDto Dto { get; }
    }

    public interface OfferActivatedDto
    {
        Guid OfferId { get; }
        
        [JsonConverter(typeof(JsonStringEnumConverter))]
        EntityStatus Status { get; }
    }
}
