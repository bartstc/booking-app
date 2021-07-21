using System.Threading;
using System.Threading.Tasks;
using Community.Domain.Members;
using Core.Commands;
using Core.Domain.Repositories;
using MediatR;

namespace Community.Application.Members.Commands.CreateMember
{
    public class CreateMemberCommandHandler : ICommandHandler<CreateMemberCommand>
    {
        private readonly IRepository<Member> memberRepository;
        private readonly IMemberUniquenessChecker memberUniquenessChecker;

        public CreateMemberCommandHandler(
            IRepository<Member> memberRepository,
            IMemberUniquenessChecker memberUniquenessChecker)
        {
            this.memberRepository = memberRepository;
            this.memberUniquenessChecker = memberUniquenessChecker;
        }

        public async Task<Unit> Handle(CreateMemberCommand request, CancellationToken cancellationToken)
        {
            var member = await Member.Create(request.FullName, request.Email, request.Phone, request.BirthDate, memberUniquenessChecker);
            memberRepository.Store(member, cancellationToken);

            return Unit.Value;
        }
    }
}
