using Accessibility.Domain.Bookings;
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
            builder.Property(b => b.Id).HasColumnName("id");

            builder.OwnsOne<EmployeeId>(p => p.EmployeeId, e =>
                e.Property(p => p.Value).HasColumnName("employeeid"));
            builder.OwnsOne<CustomerId>(p => p.CustomerId, e =>
                e.Property(p => p.Value).HasColumnName("customerid"));
            builder.OwnsOne<OfferId>(p => p.OfferId, e =>
                e.Property(p => p.Value).HasColumnName("offerid"));

            builder.OwnsOne<Money>("Price", m =>
            {
                m.Property(p => p.Value).HasColumnName("price");
                m.Property(p => p.Currency).HasColumnName("currency");
            });

            builder.Property(p => p.Status).HasColumnName("status").HasConversion(new EnumToNumberConverter<BookingStatus, short>());
            builder.Property(p => p.Date).HasColumnName("date");
            builder.Property(p => p.CreationDate).HasColumnName("creationdate");
            builder.Property(p => p.ChangeDate).HasColumnName("changedate");
        }
    }
}
