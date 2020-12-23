namespace Accessibility.Domain.SeedWork
{
    public class AggregateRootBase : Entity, IAggregateRoot
    {
        // used in implementation of optimistic concurrency
        private int version;

        public void IncreaseVersion()
        {
            version++;
        }
    }
}
