using System;
using Core.Domain;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace Core.Persistence.Postgres
{
    public class StronglyTypedIdValueConverter<TId> : ValueConverter<TId, Guid>
        where TId : StronglyTypedIdBase
    {
        public StronglyTypedIdValueConverter(ConverterMappingHints mappingHints = null)
            : base(
                id => id.Value,
                value => Create(value),
                mappingHints
            )
        {
        }

        private static TId Create(Guid id) =>
            Activator.CreateInstance(typeof(TId), id) as TId;
    }
}