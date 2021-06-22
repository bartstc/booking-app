using System;
using System.Text.Json.Serialization;
using Accessibility.Application.Facilities;

namespace Management.Facilities.Events
{
    public interface OfferAdded
    {
        OfferAddedDto Dto { get; }
    }

    public interface OfferAddedDto
    {
        Guid OfferId { get; }

        Guid FacilityId { get; }

        [JsonConverter(typeof(JsonStringEnumConverter))]
        EntityStatus Status { get; }

        string Name { get; }

        short Duration { get; }

        OfferAddedPrice Price { get; }
    }

    public interface OfferAddedPrice
    {
        string Currency { get; }
        
        string Value { get; }

        // [JsonConverter(typeof(JsonStringEnumConverter))]
        // OfferAddedPriceTypes Type { get; }
    }

    public enum OfferAddedPriceTypes
    {
        constant,
        variable,
        free,
        until
    }
}
