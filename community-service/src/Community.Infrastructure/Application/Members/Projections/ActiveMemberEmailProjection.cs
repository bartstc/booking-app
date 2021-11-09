using System;
using Community.Domain.Members.Events;
using Marten.Events.Aggregation;

namespace Community.Infrastructure.Application.Members.Projections
{
    public class ActiveMemberEmail
    {
        public Guid Id { get; set; }
        public string Email { get; set; }
    }

    public class ActiveMemberEmailProjection : AggregateProjection<ActiveMemberEmail>
    {
        public void Apply(MemberActivated @event, ActiveMemberEmail view)
        {
            view.Id = @event.Id;
            view.Email = @event.Email;
        }
    }
}
