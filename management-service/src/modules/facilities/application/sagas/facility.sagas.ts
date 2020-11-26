import { Injectable } from '@nestjs/common';
import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { CustomerAddedEvent } from '../events';
import { AddCustomerCommand } from '../commands/impl';

@Injectable()
export class FacilitySagas {
  @Saga()
  customerAdded = ($events: Observable<any>): Observable<ICommand> => {
    return $events.pipe(
      ofType(CustomerAddedEvent),
      map(({ facilityId, customerId }) => {
        return new AddCustomerCommand(facilityId, customerId);
      }),
    );
  };
}
