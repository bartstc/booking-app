using System;

namespace Core.Processing.Outbox
{
    public class OutboxNotificationProcessingDto
    {
        public Guid Id { get; set; }
        public string Type { get; set; }
        public string Data { get; set; }
    }
}