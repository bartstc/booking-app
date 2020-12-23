using FluentValidation;

namespace Accessibility.Api.Schedules
{
    public class CorrectScheduleRequestValidator : AbstractValidator<CorrectScheduleRequest>
    {
        public CorrectScheduleRequestValidator()
        {
            RuleForEach(r => r.Availabilities).SetValidator(new AvailabilityDtoValidator());
        }
    }
}
