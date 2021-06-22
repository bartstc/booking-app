using System;
using System.Text.Json.Serialization;
using Accessibility.Application.Facilities;

namespace Management.Facilities.Events
{
    public interface EmployeeAdded
    {
        EmployeeAddedDto Dto { get; }
    }

    public interface EmployeeAddedDto
    {
        Guid EmployeeId { get; }
        
        Guid FacilityId { get; }
        
        [JsonConverter(typeof(JsonStringEnumConverter))]
        EntityStatus Status { get; }

        string Name { get; }

        string Position { get; }

        DateTime Birthdate { get; }

        DateTime EmploymentDate { get; }
    }
}
