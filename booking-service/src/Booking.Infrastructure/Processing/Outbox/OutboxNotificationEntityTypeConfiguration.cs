using Booking.Infrastructure.Database;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Booking.Infrastructure.Processing.Outbox
{
    public class OutboxMessageEntityTypeConfiguration : IEntityTypeConfiguration<OutboxNotification>
    {
        public void Configure(EntityTypeBuilder<OutboxNotification> builder)
        {
            builder.ToTable("outbox_notifications", SchemaNames.App);

            builder.HasKey(b => b.Id);
            builder.Property(b => b.Id).HasColumnName("id");

            builder.Property(b => b.Type).HasColumnName("type");
            builder.Property(b => b.OccuredDate).HasColumnName("occured_date");
            builder.Property(b => b.ProcessedDate).HasColumnName("processed_date");
            builder.Property(b => b.Data).HasColumnName("data");
        }
    }
}