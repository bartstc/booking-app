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

            builder.Property<FacilityId>("facilityId").HasColumnName("facility_id");

            builder.Property("name");
            builder.Property("startDate").HasColumnName("start_date");
            builder.Property("endDate").HasColumnName("end_date");
            
            builder.Property<EmployeeId>("creatorId").HasColumnName("creator_id");
            
            builder.Property("creationDate").HasColumnName("creation_date");
            builder.Property("modifyDate").HasColumnName("modify_date");
            builder.Property("version").IsConcurrencyToken();

            builder.OwnsMany<Availability>("availabilities", x =>
            {
                x.WithOwner().HasForeignKey("schedule_id");
                x.ToTable("availabilities", SchemaNames.Accessibility);

                x.HasKey("Id");
                x.Property("Id").HasColumnName("availability_id");

                x.Property<EmployeeId>("employeeId").HasColumnName("employee_id");
                
                x.Property("startTime").HasColumnName("start_time");
                x.Property("endTime").HasColumnName("end_time");
                x.Property("Priority").HasColumnName("priority");

                x.Property<EmployeeId>("creatorId").HasColumnName("creator_id");

                x.Property("creationDate").HasColumnName("creation_date");
            });
        }
    }
}
