using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using Core.Domain;
using Core.DomainEvents;

namespace Core.Processing
{
    public class DomainEventNotificationProvider : IDomainEventNotificationProvider
    {
        private IReadOnlyDictionary<Type, Type> domainNotificationTypes; //<domain_event_type, specific_notification_type>

        public DomainEventNotificationProvider(IAssemblyProvider assemblyProvider)
        {
            domainNotificationTypes = GetNotificationTypes(assemblyProvider.Application);
        }

        public IDomainEventNotification<TDomainEvent> GetNotification<TDomainEvent>(TDomainEvent domainEvent) where TDomainEvent : IDomainEvent
        {
            if (domainNotificationTypes.TryGetValue(domainEvent.GetType(), out var resultType))
            {
                var notification = Activator.CreateInstance(resultType, domainEvent);

                if (notification != null)
                    return notification as IDomainEventNotification<TDomainEvent>;
            }

            return null;
        }

        private Dictionary<Type, Type> GetNotificationTypes(Assembly applicationAssembly)
        {
            var typeDictionary = new Dictionary<Type, Type>();

            var notificationTypes = applicationAssembly.GetExportedTypes()
                .Where(t =>
                    !t.IsInterface
                    && !t.IsAbstract
                    && typeof(IDomainEventNotification).IsAssignableFrom(t));

            foreach (var type in notificationTypes)
            {
                var domainEventType = type.BaseType.GetGenericArguments()[0];
                typeDictionary[domainEventType] = type;
            }

            return typeDictionary;
        }
    }
}
