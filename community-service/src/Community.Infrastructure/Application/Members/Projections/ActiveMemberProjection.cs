using Community.Application.Members.Queries.GetMemberByEmail;
using Community.Domain.Members.Events;
using Marten.Events.Aggregation;

namespace Community.Infrastructure.Application.Members.Projections
{
    public class ActiveMemberProjection : AggregateProjection<MemberData>
    {
        public void Apply(MemberActivated @event, MemberData view)
        {
            view.Id = @event.Id;
            view.FullName = @event.FullName;
            view.Email = @event.Email;
            view.Phone = @event.Phone;
            view.BirthDate = @event.BirthDate;
            view.Address = @event.Address;
        }
    }
}
