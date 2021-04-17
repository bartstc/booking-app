using Accessibility.Domain.SharedKernel;

namespace Accessibility.Application.Facilities
{
    public class Employee
    {
        public Employee()
        {
        }

        public Employee(EmployeeId id, FacilityId facilityId, string name, string position, EntityStatus status)
        {
            Id = id;
            FacilityId = facilityId;
            Name = name;
            Position = position;
            Status = status;
        }

        public EmployeeId Id { get; }
        public FacilityId FacilityId { get; }
        public string Name { get; }
        public string Position { get; }
        public EntityStatus Status { get; internal set; }
    }
}
