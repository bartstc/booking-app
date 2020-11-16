import { Injectable } from '@nestjs/common';
import { ICommand, ofType, Saga } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { FacilityAddedEvent } from '../../../facilities/application/events';
import { AddFacilityCommand } from '../commands/impl';

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
}
