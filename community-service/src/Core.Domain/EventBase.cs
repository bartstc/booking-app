using System;

namespace Core.Domain
{
    public abstract class EventBase : IEvent
    {
        public EventBase()
        {
            OcucuredOn = DateTime.Now;
        }

        public DateTime OcucuredOn { get; }
    }
}
