using System.Collections.Generic;

namespace Accessibility.Api.Options
{
    public class EventBusOptions
    {
        public EventBusOptions()
        {
            Exchanges = new Dictionary<string, string>();
        }
        public const string EventBus = "EventBus";

        public Dictionary<string, string> Exchanges { get; set; }
    }

    public enum EventBusExchange
    {
        BookingRequests
    }
}
