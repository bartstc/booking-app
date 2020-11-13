using System;

namespace Accessibility.Domain.SeedWork
{
    public abstract class StronglyTypedIdBase : IEquatable<StronglyTypedIdBase>
    {
        public Guid Value { get; }

        protected StronglyTypedIdBase(Guid value)
        {
            Value = value;
        }

        public bool Equals(StronglyTypedIdBase other)
        {
            return this.Value == other.Value;
        }

        public override bool Equals(object obj)
        {
            if (ReferenceEquals(null, obj)) return false;
            return obj is StronglyTypedIdBase other && Equals(other);
        }

        public override int GetHashCode()
        {
            return Value.GetHashCode();
        }

        public static bool operator ==(StronglyTypedIdBase obj1, StronglyTypedIdBase obj2)
        {
            if (object.Equals(obj1, null))
            {
                if (object.Equals(obj2, null))
                {
                    return true;
                }
                return false;
            }
            return obj1.Equals(obj2);
        }

        public static bool operator !=(StronglyTypedIdBase x, StronglyTypedIdBase y) 
        {
            return !(x == y);
        }
    }
}