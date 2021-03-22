using Accessibility.Domain.Bookings;
using Accessibility.Domain.Bookings.BookedRecords;
using Accessibility.Domain.SharedKernel;
using Accessibility.Infrastructure.Database;
using Accessibility.Infrastructure.SeedWork;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace Accessibility.Infrastructure.Domain.Bookings
{
    internal sealed class BookingEntityTypeConfiguration : IEntityTypeConfiguration<Accessibility.Domain.Bookings.Booking>
    {
        public void Configure(EntityTypeBuilder<Accessibility.Domain.Bookings.Booking> builder)
        {
            builder.ToTable("bookings", SchemaNames.Booking);

            builder.HasKey(b => b.Id);
            builder.Property(b => b.Id).HasColumnName("booking_id");

            builder.Property("customerId").HasConversion(new StronglyTypedIdValueConverter<CustomerId>()).HasColumnName("customer_id");
            builder.Property(b => b.FacilityId).HasConversion(new StronglyTypedIdValueConverter<FacilityId>()).HasColumnName("facility_id");

            builder.Property("status").HasConversion(new EnumToNumberConverter<BookingStatus, short>());
            builder.Property("requestedDate").HasColumnName("requested_date");
            builder.Property("bookedDate").HasColumnName("booked_date");

            builder.OwnsMany<BookedRecord>("bookedRecords", x =>
            {
                x.WithOwner().HasForeignKey("booking_id");
                x.ToTable("booked_records", SchemaNames.Booking);

                x.HasKey("Id");
                x.Property("Id").HasColumnName("booked_record_id");

                x.OwnsOne<EmployeeId>("employeeId", e =>
                    e.Property(p => p.Value).HasColumnName("employee_id"));
                x.OwnsOne<OfferId>("offerId", e =>
                    e.Property(p => p.Value).HasColumnName("offer_id"));
                
                x.OwnsOne<Money>("price", m =>
                {
                    m.Property(p => p.Value).HasColumnName("price");
                    m.Property(p => p.Currency).HasColumnName("currency");
                });

                x.Property("date");
                x.Property("durationInMinutes").HasColumnName("duration");
                x.Property("status").HasConversion(new EnumToNumberConverter<BookedRecordStatus, short>());
                x.Property("changeDate").HasColumnName("change_date");
            });
        }
    }
}
