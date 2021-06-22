using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Core.Processing.Outbox
{
    public class OutboxMessageEntityTypeConfiguration : IEntityTypeConfiguration<OutboxNotification>
    {
        private const string defaultSchema = "app";

        public void Configure(EntityTypeBuilder<OutboxNotification> builder)
        {
            builder.ToTable("outbox_notifications", defaultSchema);

            builder.HasKey(b => b.Id);
            builder.Property(b => b.Id).HasColumnName("id");

            builder.Property(b => b.Type).HasColumnName("type");
            builder.Property(b => b.OccuredDate).HasColumnName("occured_date");
            builder.Property(b => b.ProcessedDate).HasColumnName("processed_date");
            builder.Property(b => b.Data).HasColumnName("data");
        }
    }
}