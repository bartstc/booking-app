using System.Collections.Generic;
using Accessibility.Application;

namespace Accessibility.Api.Options
{
    public class EventBusOptions
    {
        public EventBusOptions()
        {
            Exchanges = new Dictionary<EventBusExchange, string>();
        }
        public const string EventBus = "EventBus";

        public Dictionary<EventBusExchange, string> Exchanges { get; set; }
    }
}
