using System;
using System.Linq;
using System.Text.Json;
using System.Threading;
using System.Threading.Tasks;
using Booking.Application.Configuration.Database;
using Booking.Application.Configuration.DomainEvents;
using Dapper;
using MediatR;

namespace Booking.Infrastructure.Processing.Outbox
{
    internal class ProcessOutboxCommandHandler : IRequestHandler<ProcessOutboxCommand, Unit>
    {
        private readonly ISqlConnectionFactory sqlConnectionFactory;
        private readonly IMediator mediator;

        public ProcessOutboxCommandHandler(ISqlConnectionFactory sqlConnectionFactory, IMediator mediator)
        {
            this.sqlConnectionFactory = sqlConnectionFactory;
            this.mediator = mediator;
        }

        public async Task<Unit> Handle(ProcessOutboxCommand request, CancellationToken cancellationToken)
        {
            var connection = sqlConnectionFactory.GetConnection();
            var entities = (await connection.QueryAsync<OutboxNotificationProcessingDto>(
                @"SELECT id, type, data
                FROM app.outbox_notifications
                WHERE processed_date IS NULL;"
            )).AsList();

            if (entities.Any())
            {
                var updateSql =
                @"UPDATE app.outbox_notifications
                SET processed_date = @Date
                WHERE id = @Id;";
            
                foreach (var entity in entities)
                {
                    var type = Assemblies.Application.GetType(entity.Type);
                    var notification = JsonSerializer.Deserialize(entity.Data, type) as IDomainEventNotification;

                    await mediator.Publish(notification, cancellationToken);

                    await connection.ExecuteAsync(updateSql, new
                    {
                        Date = DateTime.Now,
                        Id = entity.Id
                    });
                }
            }
            
            return Unit.Value;
        }
    }
}