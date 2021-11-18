using Core.Queries;

namespace Community.Application.Members.Queries.GetMemberByEmail
{
    public record GetMemberByEmailQuery(string Email)
        : IQuery<MemberData>;
}
