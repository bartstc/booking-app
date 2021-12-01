using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Accessibility.Domain.Schedules;
using Accessibility.Domain.SharedKernel;
using MediatR;
using Core.Domain.UnitOfWork;
using Core.Commands;
using System;

namespace Accessibility.Application.Availabilities.Commands.UpdateInPeriodOfTime
{
    public class UpdateAvailabilitiesInPeriodOfTimeCommandHandler : ICommandHandler<UpdateAvailabilitiesInPeriodOfTimeCommand>
    {
        private readonly IScheduleRepository repository;
        private readonly IUnitOfWork unitOfWork;

        public UpdateAvailabilitiesInPeriodOfTimeCommandHandler(IScheduleRepository repository, IUnitOfWork unitOfWork)
        {
            this.repository = repository;
            this.unitOfWork = unitOfWork;
        }

        public async Task<Unit> Handle(UpdateAvailabilitiesInPeriodOfTimeCommand request, CancellationToken cancellationToken)
        {
            var facilityId = new FacilityId(request.FacilityId);
            var scheduleId = new ScheduleId(request.ScheduleId);
            var employeeId = new EmployeeId(request.Dto.EmployeeId);
            var creatorId = new EmployeeId(request.Dto.CreatorId);

            var schedule = await repository.GetByIdAsync(scheduleId, facilityId);

            if (schedule == null)
                throw new Exception("Schedule does not exist.");

            schedule.OverrideAvailabilitiesInPeriodOfTime(
                new PeriodOfTime(request.Dto.DateFrom, request.Dto.DateTo),
                employeeId,
                creatorId,
                request.Dto.Availabilities.Select(a => new PeriodOfTime(
                    a.StartTime,
                    a.EndTime
                ))
            );
            
            schedule.IncreaseVersion();
            return Unit.Value;
        }
    }
}
