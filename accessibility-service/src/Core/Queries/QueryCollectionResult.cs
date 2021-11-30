using System.Collections.Generic;

namespace Core.Queries
{
    public class QueryCollectionResult<TResult>
    {
        public QueryCollectionResult(IEnumerable<TResult> collection, long total, int limit, int offset)
        {
            Collection = collection;
            Meta = new Metadata(total, limit, offset);
        }

        public IEnumerable<TResult> Collection { get; }
        public Metadata Meta { get; }
    }

    public record Metadata(
        long Total,
        int Limit,
        int Offset
    );
}
