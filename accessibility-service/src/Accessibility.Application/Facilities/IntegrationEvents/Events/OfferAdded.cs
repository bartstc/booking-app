using System;
using System.Text.Json.Serialization;

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
        string Status { get; }
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
