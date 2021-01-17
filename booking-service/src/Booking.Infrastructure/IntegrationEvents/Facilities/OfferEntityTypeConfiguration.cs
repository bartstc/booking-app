using Booking.Application.Facilities.IntegrationEvents.Events;
using Booking.Infrastructure.Database;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Booking.Infrastructure.IntegrationEvents.Facilities
{
    public class OfferEntityTypeConfiguration : IEntityTypeConfiguration<OfferCreated>
    {
        public void Configure(EntityTypeBuilder<OfferCreated> builder)
        {
            builder.ToTable("offers", SchemaNames.Facility);

            builder.HasKey(b => b.Id);
            builder.Property(b => b.Id).HasColumnName("offer_id");

            builder.Property(b => b.FacilityId).HasColumnName("facility_id");
            builder.Property(b => b.Price).HasColumnName("price");
            builder.Property(b => b.Currency).HasColumnName("currency");
            builder.Property(b => b.Duration).HasColumnName("duration");

        }
    }
}
