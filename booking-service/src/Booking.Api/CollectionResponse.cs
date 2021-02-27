using System.Collections.Generic;
using System.Linq;

namespace Booking.Api
{
    public class CollectionResponse<TResponse>
    {
        public CollectionResponse(IEnumerable<TResponse> collection)
        {
            Collection = collection;
            Meta = new Metadata(collection.Count());
        }

        public IEnumerable<TResponse> Collection { get; }
        public Metadata Meta { get; }
    }

    public class Metadata
    {
        public Metadata(int total)
        {
            Total = total;
        }

        public int Total { get; }
    }
}
