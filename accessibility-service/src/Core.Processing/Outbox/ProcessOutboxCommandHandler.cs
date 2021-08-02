using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Core.Database;
using Core.DomainEvents;
using Dapper;
using MediatR;
using Newtonsoft.Json;

namespace Core.Processing.Outbox
{
    internal class ProcessOutboxCommandHandler : IRequestHandler<ProcessOutboxCommand, Unit>
    {
        private readonly ISqlConnectionFactory sqlConnectionFactory;
        private readonly IMediator mediator;
        private readonly IAssemblyProvider assemblyProvider;

        public ProcessOutboxCommandHandler(
            ISqlConnectionFactory sqlConnectionFactory,
            IMediator mediator,
            IAssemblyProvider assemblyProvider)
        {
            this.sqlConnectionFactory = sqlConnectionFactory;
            this.mediator = mediator;
            this.assemblyProvider = assemblyProvider;
        }

        public async Task<Unit> Handle(ProcessOutboxCommand request, CancellationToken cancellationToken)
        {
            var connection = sqlConnectionFactory.GetConnection();
            var entities = (await connection.QueryAsync<OutboxNotificationProcessingDto>(
                @"SELECT
                    id,
                    type,
                    data
                FROM
                    app.outbox_notifications
                WHERE
                    processed_date IS NULL;"
            )).AsList();

            if (entities.Any())
            {
                var updateSql =
                    @"UPDATE
                        app.outbox_notifications
                    SET
                        processed_date = @Date
                    WHERE
                        id = @Id;";
            
                foreach (var entity in entities)
                {
                    var type = assemblyProvider.Application.GetType(entity.Type);
                    var notification = JsonConvert.DeserializeObject(entity.Data, type) as IDomainEventNotification;

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