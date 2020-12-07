import { EventsHandler, IEventHandler } from '@nestjs/cqrs';

import { FacilityRepository } from '../../infra';
import { CustomerAddedEvent } from '../../../customers/domain/events';

@EventsHandler(CustomerAddedEvent)
export class CustomerAddedHandler implements IEventHandler<CustomerAddedEvent> {
  constructor(private readonly repository: FacilityRepository) {}

  async handle({ facilityId, customerId }: CustomerAddedEvent) {
    await this.repository.addCustomer(facilityId, customerId);
  }
}
