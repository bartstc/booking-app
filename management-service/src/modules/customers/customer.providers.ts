import { Provider } from '@nestjs/common';
import { Connection } from 'typeorm/index';

import { CustomerKeys } from './CustomerKeys';
import { CustomerQuery, CustomerRepository } from './infra';
import { InfrastructureKeys } from '../../InfrastructureKeys';
import { LoggerService } from '../../logger';

export const providers: Provider[] = [
  {
    provide: CustomerKeys.CustomerRepository,
    useFactory: (connection: Connection) =>
      connection.getCustomRepository(CustomerRepository),
    inject: [InfrastructureKeys.DbService],
  },
  {
    provide: CustomerKeys.CustomerQuery,
    useFactory: (connection: Connection) =>
      connection.getCustomRepository(CustomerQuery),
    inject: [InfrastructureKeys.DbService],
  },
  {
    provide: InfrastructureKeys.CustomersLoggerService,
    useValue: new LoggerService('CustomerModule'),
  },
];
