import { FacilityId } from '../../../facilities/domain';
import { CustomerId } from '../CustomerId';

export class CustomerAddedEvent {
  constructor(
    public readonly facilityId: FacilityId,
    public readonly customerId: CustomerId,
  ) {}
}
