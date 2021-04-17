using Accessibility.Application.Facilities;
using Accessibility.Infrastructure.Database;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Accessibility.Infrastructure.Application.Facilities.Employees
{
    public class EmployeeEntityTypeConfiguration : IEntityTypeConfiguration<Employee>
    {
        public void Configure(EntityTypeBuilder<Employee> builder)
        {
            builder.ToTable("employees", SchemaNames.Facility);

            builder.HasKey(b => b.Id);
            builder.Property(b => b.Id).HasColumnName("employee_id");

            builder.Property(b => b.FacilityId).HasColumnName("facility_id");
            builder.Property(b => b.Name).HasColumnName("name");
            builder.Property(b => b.Position).HasColumnName("position");
            builder.Property(b => b.Status).HasColumnName("status");
        }
    }
}
