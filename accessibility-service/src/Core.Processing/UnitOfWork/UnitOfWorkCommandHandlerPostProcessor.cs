using System.Threading;
using System.Threading.Tasks;
using Core.Commands;
using Core.Domain.UnitOfWork;
using MediatR.Pipeline;

namespace Core.Processing
{
    public class UnitOfWorkCommandHandlerPostProcessor<TCommand, TResult> : IRequestPostProcessor<TCommand, TResult>
        where TCommand : ICommand
    {
        private readonly IUnitOfWork unitOfWork;

        public UnitOfWorkCommandHandlerPostProcessor(IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
        }

        public async Task Process(TCommand request, TResult response, CancellationToken cancellationToken)
        {
            await unitOfWork.CommitAsync(cancellationToken);
        }
    }
}
