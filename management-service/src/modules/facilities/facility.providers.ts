import { Provider } from '@nestjs/common';
import { Connection } from 'typeorm/index';

import { InfrastructureKeys } from '../../InfrastructureKeys';
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
    inject: [InfrastructureKeys.DbService],
  },
  {
    provide: FacilityKeys.EmployeeRepository,
    useFactory: (connection: Connection) =>
      connection.getCustomRepository(EmployeeRepository),
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
    provide: FacilityKeys.EmployeeQuery,
    useFactory: (connection: Connection) =>
      connection.getCustomRepository(EmployeeQuery),
    inject: [InfrastructureKeys.DbService],
  },
  {
    provide: FacilityKeys.OfferQuery,
    useFactory: (connection: Connection) =>
      connection.getCustomRepository(OfferQuery),
    inject: [InfrastructureKeys.DbService],
  },
];
