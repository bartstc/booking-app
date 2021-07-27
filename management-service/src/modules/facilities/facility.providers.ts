import { Provider } from '@nestjs/common';
import { Connection } from 'typeorm/index';

import { InfrastructureKeys } from '../../InfrastructureKeys';
import { FacilityKeys } from './FacilityKeys';
import {
  FacilityQuery,
  FacilityRepository,
  OfferQuery,
  OfferRepository,
} from './infra';
import { LoggerService } from '../../logger';

export const providers: Provider[] = [
  {
    provide: FacilityKeys.FacilityRepository,
    useFactory: (connection: Connection) =>
      connection.getCustomRepository(FacilityRepository),
    inject: [InfrastructureKeys.DbService],
  },
  {
    provide: FacilityKeys.OfferRepository,
    useFactory: (connection: Connection) =>
      connection.getCustomRepository(OfferRepository),
    inject: [InfrastructureKeys.DbService],
  },
  {
    provide: FacilityKeys.FacilityQuery,
    useFactory: (connection: Connection) =>
      connection.getCustomRepository(FacilityQuery),
    inject: [InfrastructureKeys.DbService],
  },
  {
    provide: FacilityKeys.OfferQuery,
    useFactory: (connection: Connection) =>
      connection.getCustomRepository(OfferQuery),
    inject: [InfrastructureKeys.DbService],
  },
  {
    provide: InfrastructureKeys.FacilitiesLoggerService,
    useValue: new LoggerService('FacilitiesModule'),
  },
];
