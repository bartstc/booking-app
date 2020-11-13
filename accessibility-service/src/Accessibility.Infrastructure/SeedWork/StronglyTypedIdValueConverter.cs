using System;
using Accessibility.Domain.SeedWork;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace Accessibility.Infrastructure.SeedWork
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