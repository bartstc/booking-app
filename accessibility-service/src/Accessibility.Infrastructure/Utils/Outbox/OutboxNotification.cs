using System;

namespace Accessibility.Infrastructure.Utils.Outbox
{
    public class OutboxNotification
    {
        public Guid Id { get; set; }
        public string Type { get; set; }
        public DateTime OccuredDate { get; set; }
        public DateTime? ProcessedDate { get; set; }
        public string Data { get; set; }

        public OutboxNotification()
        {
        }

        public OutboxNotification(string type, DateTime occuredDate, string data)
        {
            Id = Guid.NewGuid();
            Type = type;
            OccuredDate = occuredDate;
            Data = data;
        }
    }
}