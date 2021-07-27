using System;

namespace ExternalEvents.Accessibility.BookingRecords.Dtos
{
    public class Offer
    {
        public Offer(string name, Guid id)
        {
            Name = name;
            Id = id;
        }

        public string Name { get; }
        public Guid Id { get; }
    }
}
