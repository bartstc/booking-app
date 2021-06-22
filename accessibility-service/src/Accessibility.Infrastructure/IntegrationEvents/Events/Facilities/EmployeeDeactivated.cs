using System;

namespace Accessibility.Infrastructure.IntegrationEvents.Events.Facility
{
    public interface EmployeeDeactivated
    {
        Guid EmployeeId { get; }
    }
}
