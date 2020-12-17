import { Provider } from '@nestjs/common';
import { Connection } from 'typeorm/index';

import { DB_CONNECTION } from '../../constants';
import { FacilityKeys } from './FacilityKeys';
import {
  EmployeeQuery,
  FacilityQuery,
  FacilityRepository,
  OfferQuery,
  EmployeeRepository,
  OfferRepository,
} from './infra';

export const providers: Provider[] = [
  {
    provide: FacilityKeys.FacilityRepository,
    useFactory: (connection: Connection) =>
      connection.getCustomRepository(FacilityRepository),
    inject: [DB_CONNECTION],
  },
  {
    provide: FacilityKeys.EmployeeRepository,
    useFactory: (connection: Connection) =>
      connection.getCustomRepository(EmployeeRepository),
    inject: [DB_CONNECTION],
  },
  {
    provide: FacilityKeys.OfferRepository,
    useFactory: (connection: Connection) =>
      connection.getCustomRepository(OfferRepository),
    inject: [DB_CONNECTION],
  },
  {
    provide: FacilityKeys.FacilityQuery,
    useFactory: (connection: Connection) =>
      connection.getCustomRepository(FacilityQuery),
    inject: [DB_CONNECTION],
  },
  {
    provide: FacilityKeys.EmployeeQuery,
    useFactory: (connection: Connection) =>
      connection.getCustomRepository(EmployeeQuery),
    inject: [DB_CONNECTION],
  },
  {
    provide: FacilityKeys.OfferQuery,
    useFactory: (connection: Connection) =>
      connection.getCustomRepository(OfferQuery),
    inject: [DB_CONNECTION],
  },
];
