using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Accessibility.Domain.Schedules;
using Accessibility.Domain.Schedules.Availabilities;
using Accessibility.Domain.SharedKernel;
using MediatR;
using Core.Domain.UnitOfWork;
using Core.Commands;

namespace Accessibility.Application.Availabilities.Commands.UpdateInPeriodOfTime
{
    public class UpdateAvailabilitiesInPeriodOfTimeCommandHandler : IRequestHandler<UpdateAvailabilitiesInPeriodOfTimeCommand, CommandResult<int>>
    {
        private readonly IScheduleRepository repository;
        private readonly IUnitOfWork unitOfWork;

        public UpdateAvailabilitiesInPeriodOfTimeCommandHandler(IScheduleRepository repository, IUnitOfWork unitOfWork)
        {
            this.repository = repository;
            this.unitOfWork = unitOfWork;
        }

        public async Task<CommandResult<int>> Handle(UpdateAvailabilitiesInPeriodOfTimeCommand request, CancellationToken cancellationToken)
        {
            var groupedAvailabilities = request.Availabilities.GroupBy(a => a.StartTime.Date);

            var schedule = await repository.GetByIdAsync(request.ScheduleId, request.FacilityId);

            if (schedule == null)
                return new CommandResult<int>(false, "Schedule does not exist.");

            schedule.OverrideAvailabilitiesInPeriodOfTime(
                new PeriodOfTime(request.DateFrom, request.DateTo),
                request.Availabilities.Select(a => new AvailabilityData(
                    new EmployeeId(a.EmployeeId),
                    new PeriodOfTime(a.StartTime, a.EndTime),
                    new EmployeeId(a.CreatorId)
                )));
            
            schedule.IncreaseVersion();

            await unitOfWork.CommitAsync();
            
            return new CommandResult<int>(true, request.Availabilities.Count());
        }
    }
}
