using MediatR;

namespace Core.Queries
{
    public interface IQuery<out TResult> : IRequest<TResult>
    {
    }
}
