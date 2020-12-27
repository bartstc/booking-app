using Booking.Domain.Bookings;
using Booking.Domain.Bookings.BookedRecords;
using Booking.Domain.SharedKernel;
using Booking.Infrastructure.Database;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace Booking.Infrastructure.Domain.Bookings
{
    internal sealed class BookingEntityTypeConfiguration : IEntityTypeConfiguration<Booking.Domain.Bookings.Booking>
    {
        public void Configure(EntityTypeBuilder<Booking.Domain.Bookings.Booking> builder)
        {
            builder.ToTable("bookings", SchemaNames.Booking);

            builder.HasKey(b => b.Id);
            builder.Property(b => b.Id).HasColumnName("booking_id");

            builder.OwnsOne<CustomerId>("customerId", e =>
                e.Property(p => p.Value).HasColumnName("customer_id"));
            builder.OwnsOne<FacilityId>("facilityId", e =>
                e.Property(p => p.Value).HasColumnName("facility_id"));

            builder.Property("status").HasConversion(new EnumToNumberConverter<BookingStatus, short>());
            builder.Property("creationDate").HasColumnName("creation_date");

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
