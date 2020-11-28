import { Injectable } from '@nestjs/common';
import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { CustomerAddedEvent, CustomerDeletedEvent } from '../events';
import {
  AddCustomerToFacilityCommand,
  DeleteCustomerFromFacilityCommand,
} from '../commands/impl';

@Injectable()
export class FacilitySagas {
  @Saga()
  customerAdded = ($events: Observable<any>): Observable<ICommand> => {
    return $events.pipe(
      ofType(CustomerAddedEvent),
      map(({ facilityId, customerId }) => {
        return new AddCustomerToFacilityCommand(facilityId, customerId);
      }),
    );
  };

  @Saga()
  customerDeleted = ($events: Observable<any>): Observable<ICommand> => {
    return $events.pipe(
      ofType(CustomerDeletedEvent),
      map(({ customerId, facilityId }) => {
        return new DeleteCustomerFromFacilityCommand(facilityId, customerId);
      }),
    );
  };
}
