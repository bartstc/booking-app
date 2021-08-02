using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Accessibility.Application.Facilities;
using Accessibility.Domain.SharedKernel;
using Accessibility.Infrastructure.Database;
using Microsoft.EntityFrameworkCore;

namespace Accessibility.Infrastructure.Application.Facilities.Employees
{
    public class EmployeeRepository : IEmployeeRepository
    {
        private readonly AccessibilityContext ctx;

        public EmployeeRepository(AccessibilityContext ctx)
        {
            this.ctx = ctx;
        }

        public async Task AddAsync(Employee employee)
        {
            await ctx.AddAsync(employee);
        }

        public async Task<Employee> GetByIdAsync(EmployeeId id) =>
            await ctx.Employees.FirstOrDefaultAsync(e => e.Id == id);

        public async Task<IEnumerable<Employee>> GetByIdsAsync(IEnumerable<EmployeeId> employeeIds) =>
            await ctx.Employees
                .Where(e => employeeIds.Contains(e.Id))
                .AsNoTracking()
                .ToListAsync();
    }
}
