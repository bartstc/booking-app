using Booking.Application.Facilities;
using Booking.Infrastructure.Database;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Booking.Infrastructure.IntegrationEvents.Facilities
{
    public class OfferEntityTypeConfiguration : IEntityTypeConfiguration<Offer>
    {
        public void Configure(EntityTypeBuilder<Offer> builder)
        {
            builder.ToTable("offers", SchemaNames.Facility);

            builder.HasKey(b => b.Id);
            builder.Property(b => b.Id).HasColumnName("offer_id");

            builder.Property(b => b.FacilityId).HasColumnName("facility_id");
            builder.Property(b => b.Name).HasColumnName("name");
            builder.Property(b => b.Price).HasColumnName("price");
            builder.Property(b => b.Currency).HasColumnName("currency");
            builder.Property(b => b.Duration).HasColumnName("duration");

        }
    }
}
