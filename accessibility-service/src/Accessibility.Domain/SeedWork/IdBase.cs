using System;

namespace Accessibility.Domain.SeedWork
{
    public abstract class IdBase : IEquatable<IdBase>
    {
        public Guid Value { get; }

        protected IdBase(Guid value)
        {
            Value = value;
        }

        public bool Equals(IdBase other) =>
            Value == other.Value;

        public override bool Equals(object obj) =>
            ReferenceEquals(obj, null) ?
                false :
                obj is IdBase && Equals(obj);

        public override int GetHashCode()
        {
            return Value.GetHashCode();
        }

        public static bool operator ==(IdBase obj1, IdBase obj2)
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

        public static bool operator !=(IdBase x, IdBase y) 
        {
            return !(x == y);
        }
    }
}