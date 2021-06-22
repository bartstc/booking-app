using System.Threading;
using System.Threading.Tasks;
using Core.Domain.UnitOfWork;
using MediatR;

namespace Accessibility.Application.Facilities.Commands.CreateEmployee
{
    public class CreateEmployeeCommandHandler : IRequestHandler<CreateEmployeeCommand>
    {
        private readonly IEmployeeRepository repository;
        private readonly IUnitOfWork unitOfWork;

        public CreateEmployeeCommandHandler(IEmployeeRepository repository, IUnitOfWork unitOfWork)
        {
            this.repository = repository;
            this.unitOfWork = unitOfWork;
        }

        public async Task<Unit> Handle(CreateEmployeeCommand request, CancellationToken cancellationToken)
        {
            var employee = new Employee(
                request.EmployeeId,
                request.FacilityId,
                request.Name,
                request.Position,
                request.Status
            );

            await repository.AddAsync(employee);
            await unitOfWork.CommitAsync();

            return Unit.Value;
        }
    }
}
