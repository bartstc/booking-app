using Accessibility.Domain.Schedules;
using Accessibility.Domain.SharedKernel;
using Accessibility.Infrastructure.Database;
using Microsoft.EntityFrameworkCore;
using Accessibility.Domain.Schedules.Availabilities;

namespace Accessibility.Infrastructure.Domain.Schedules
{
    public class ScheduleEntityTypeConfiguration : IEntityTypeConfiguration<Schedule>
    {
        public void Configure(Microsoft.EntityFrameworkCore.Metadata.Builders.EntityTypeBuilder<Schedule> builder)
        {
            builder.ToTable("schedules", SchemaNames.Accessibility);

            builder.HasKey(b => b.Id);
            builder.Property(b => b.Id).HasColumnName("schedule_id");

            builder.OwnsOne<FacilityId>("facilityId", e =>
                e.Property(p => p.Value).HasColumnName("facility_id"));

            builder.Property("name");
            builder.Property("startDate").HasColumnName("start_date");
            builder.Property("endDate").HasColumnName("end_date");
            
            builder.OwnsOne<FacilityId>("creatorId", e =>
                e.Property(p => p.Value).HasColumnName("creator_id"));
            
            builder.Property("creationDate").HasColumnName("creation_date");
            builder.Property("modifyDate").HasColumnName("modify_date");

            builder.OwnsMany<Availability>("availabilities", x =>
            {
                x.WithOwner().HasForeignKey("schedule_id");
                x.ToTable("availability", SchemaNames.Accessibility);

                x.HasKey("id");
                x.Property("id").HasColumnName("availability_id");

                builder.OwnsOne<EmployeeId>("employeeId", e =>
                    e.Property(p => p.Value).HasColumnName("employee_id"));
                
                builder.Property("startTime").HasColumnName("start_time");
                builder.Property("endTime").HasColumnName("end_time");
                builder.Property("Priority").HasColumnName("priority");

                builder.OwnsOne<EmployeeId>("creatorId", e =>
                    e.Property(p => p.Value).HasColumnName("creator_id"));

                builder.Property("creationDate").HasColumnName("creation_date");
            });
        }
    }
}
