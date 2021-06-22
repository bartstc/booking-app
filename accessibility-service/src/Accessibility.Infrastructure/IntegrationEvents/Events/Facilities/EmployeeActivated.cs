using System;

namespace Accessibility.Infrastructure.IntegrationEvents.Events.Facility
{
    public interface EmployeeActivated
    {
        Guid EmployeeId { get; }
    }
}
