using System.Collections.Generic;
using System.Threading.Tasks;
using Accessibility.Domain.SharedKernel;

namespace Accessibility.Application.Facilities
{
    public interface IEmployeeRepository
    {
        Task AddAsync(Employee employee);
        Task<Employee> GetByIdAsync(EmployeeId id);
        Task<IEnumerable<Employee>> GetByIdsAsync(IEnumerable<EmployeeId> employeeIds);
    }
}
