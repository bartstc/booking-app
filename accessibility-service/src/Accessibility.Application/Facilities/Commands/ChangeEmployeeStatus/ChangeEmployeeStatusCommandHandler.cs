using System.Threading;
using System.Threading.Tasks;
using Accessibility.Domain.SeedWork;
using MediatR;

namespace Accessibility.Application.Facilities.Commands.ChangeEmployeeStatus
{
    public class ChangeEmployeeStatusCommandHandler : IRequestHandler<ChangeEmployeeStatusCommand>
    {
        private readonly IEmployeeRepository repository;
        private readonly IUnitOfWork unitOfWork;

        public ChangeEmployeeStatusCommandHandler(IEmployeeRepository repository, IUnitOfWork unitOfWork)
        {
            this.repository = repository;
            this.unitOfWork = unitOfWork;
        }

        public async Task<Unit> Handle(ChangeEmployeeStatusCommand request, CancellationToken cancellationToken)
        {
            var employee = await repository.GetByIdAsync(request.EmployeeId);

            if (employee != null)
            {
                employee.Status = request.Status;
                await unitOfWork.CommitAsync();
            }

            return Unit.Value;
        }
    }
}
