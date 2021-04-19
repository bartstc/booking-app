using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Accessibility.Domain.Schedules;
using Accessibility.Domain.Schedules.Availabilities;
using Accessibility.Domain.SeedWork;
using Accessibility.Domain.SharedKernel;
using MediatR;

namespace Accessibility.Application.Schedules.Commands.ModifySchedule
{
    public class ModifyScheduleCommandHandler : IRequestHandler<ModifyScheduleCommand, Guid>
    {
        private readonly IScheduleRepository repository;
        private readonly ISchedulePeriodOfTimeChecker schedulePeriodOfTimeChecker;
        private readonly IUnitOfWork unitOfWork;

        public ModifyScheduleCommandHandler(
            IScheduleRepository repository,
            ISchedulePeriodOfTimeChecker schedulePeriodOfTimeChecker,
            IUnitOfWork unitOfWork)
        {
            this.repository = repository;
            this.schedulePeriodOfTimeChecker = schedulePeriodOfTimeChecker;
            this.unitOfWork = unitOfWork;
        }

        public async Task<Guid> Handle(ModifyScheduleCommand request, CancellationToken cancellationToken)
        {
            var facilityId = new FacilityId(request.FacilityId);
            var schedule = await repository.GetByIdAsync(new ScheduleId(request.ScheduleId), facilityId);

            schedule.Modify(
                schedulePeriodOfTimeChecker,
                request.Name,
                request.StartDate,
                request.EndDate,
                request.Availabilities.Select(a => new AvailabilityData(
                    new EmployeeId(a.EmployeeId),
                    new PeriodOfTime(a.StartTime, a.EndTime),
                    new EmployeeId(a.CreatorId)
                )).ToList(),
                new EmployeeId(request.CreatorId)
            );

            schedule.IncreaseVersion();

            await unitOfWork.CommitAsync(cancellationToken);

            return schedule.Id.Value;
        }
    }
}
