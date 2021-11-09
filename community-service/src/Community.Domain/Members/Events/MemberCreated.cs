using System;
using System.Text.Json.Serialization;
using Community.Domain.Members.ValueObjects;
using Core.Domain;

namespace Community.Domain.Members.Events
{
    public class MemberCreated : EventBase
    {
        [JsonConstructor]
        public MemberCreated(Guid id, string fullName, string email, string phone, DateTime? birthDate, Address address)
        {
            Id = id;
            FullName = fullName;
            Email = email;
            Phone = phone;
            BirthDate = birthDate;
            Address = address;
        }

        public Guid Id { get; }
        public string FullName { get; }
        public string Email { get; }
        public string Phone { get; }
        public DateTime? BirthDate { get; }
        public Address Address { get; }
    }
}
