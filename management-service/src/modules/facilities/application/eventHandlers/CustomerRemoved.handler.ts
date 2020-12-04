import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { FacilityRepository } from '../../infra';
import { CustomerRemovedEvent } from '../../../customers/domain/events';

@EventsHandler(CustomerRemovedEvent)
export class CustomerRemovedHandler
  implements IEventHandler<CustomerRemovedEvent> {
  constructor(private readonly repository: FacilityRepository) {}

  async handle({ facilityId, customerId }: CustomerRemovedEvent) {
    await this.repository.removeCustomer(facilityId, customerId);
  }
}
