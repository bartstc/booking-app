import { Injectable } from '@nestjs/common';
import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { FacilityAddedEvent, FacilityRemovedEvent } from '../../domain/events';
import { AddFacilityCommand } from '../command/addFacility';
import { RemoveFacilityCommand } from '../command/removeFacility';

@Injectable()
export class EnterpriseSaga {
  @Saga()
  facilityAdded = ($events: Observable<any>): Observable<ICommand> => {
    return $events.pipe(
      ofType(FacilityAddedEvent),
      map(({ enterpriseId, facilityId }) => {
        return new AddFacilityCommand(enterpriseId, facilityId);
      }),
    );
  };

  @Saga()
  facilityRemoved = ($events: Observable<any>): Observable<ICommand> => {
    return $events.pipe(
      ofType(FacilityRemovedEvent),
      map(({ enterpriseId, facilityId }) => {
        return new RemoveFacilityCommand(enterpriseId, facilityId);
      }),
    );
  };
}
