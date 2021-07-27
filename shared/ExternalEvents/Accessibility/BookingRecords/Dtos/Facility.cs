using System;

namespace ExternalEvents.Accessibility.BookingRecords.Dtos
{
    public class Facility
    {
        public Facility(string name, string address, Guid id)
        {
            Name = name;
            Address = address;
            Id = id;
        }

        public string Name { get; }
        public string Address { get; }
        public Guid Id { get; }
    }
}
