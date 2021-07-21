using System;
using System.Threading.Tasks;
using Community.Domain.Members.Events;
using Community.Domain.Members.Rules;
using Core.Domain;

namespace Community.Domain.Members
{
    public class Member : AggregateBase
    {
        public string FullName { get; private set; }
        public string Email { get; private set; }
        public string Phone { get; private set; }
        public DateTime? BirthDate { get; private set; }

        private Member(string fullName, string email, string phone, DateTime? birthDate)
        {
            var @event = new MemberCreated(Guid.NewGuid(), fullName, email, phone, birthDate);

            Enqueue(@event);
            Apply(@event);
        }

        public static async Task<Member> Create(string fullName, string email, string phone, DateTime? birthDate,
            IMemberUniquenessChecker memberUniquenessChecker)
        {
            await CheckRuleAsync(new MemberEmailMustBeUniqueRule(email, memberUniquenessChecker));
            return new Member(fullName, email, phone, birthDate);            
        }

        public void Apply(MemberCreated @event)
        {
            Id = @event.Id;
            FullName = @event.FullName;
            Email = @event.Email;
            Phone = @event.Phone;
            BirthDate = @event.BirthDate;
        }
    }
}
