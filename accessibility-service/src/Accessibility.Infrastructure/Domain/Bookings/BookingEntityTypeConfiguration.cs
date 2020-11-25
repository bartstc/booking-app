using Accessibility.Domain.Bookings;
using Accessibility.Domain.Bookings.BookingServices;
using Accessibility.Domain.SharedKernel;
using Accessibility.Infrastructure.Database;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace Accessibility.Infrastructure.Domain.Bookings
{
    internal sealed class BookingEntityTypeConfiguration : IEntityTypeConfiguration<Booking>
    {
        public void Configure(EntityTypeBuilder<Booking> builder)
        {
            builder.ToTable("bookings", SchemaNames.Accessibility);

            builder.HasKey(b => b.Id);
            builder.Property(b => b.Id).HasColumnName("booking_id");

            builder.OwnsOne<CustomerId>("customerId", e =>
                e.Property(p => p.Value).HasColumnName("customer_id"));
            builder.OwnsOne<FacilityId>("facilityId", e =>
                e.Property(p => p.Value).HasColumnName("facility_id"));

            builder.Property("creationDate").HasColumnName("creation_date");

            builder.OwnsMany<BookingService>("bookingServices", x =>
            {
                x.WithOwner().HasForeignKey("booking_id");
                x.ToTable("booking_services", SchemaNames.Accessibility);

                x.HasKey("Id");
                x.Property("Id").HasColumnName("booking_service_id");

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
                x.Property("status").HasConversion(new EnumToNumberConverter<BookingServiceStatus, short>());
                x.Property("changeDate").HasColumnName("change_date");
            });
        }
    }
}
