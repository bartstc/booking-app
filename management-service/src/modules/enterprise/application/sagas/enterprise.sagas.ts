import { Injectable } from '@nestjs/common';
import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AddFacilityCommand, RemoveFacilityCommand } from '../commands/impl';
import { FacilityAddedEvent, FacilityRemovedEvent } from '../events';

@Injectable()
export class EnterpriseSagas {
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
