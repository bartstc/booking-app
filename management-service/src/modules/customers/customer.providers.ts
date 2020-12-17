import { Provider } from '@nestjs/common';
import { Connection } from 'typeorm/index';

import { DB_CONNECTION } from '../../constants';
import { CustomerKeys } from './CustomerKeys';
import { CustomerQuery, CustomerRepository } from './infra';

export const providers: Provider[] = [
  {
    provide: CustomerKeys.CustomerRepository,
    useFactory: (connection: Connection) =>
      connection.getCustomRepository(CustomerRepository),
    inject: [DB_CONNECTION],
  },
  {
    provide: CustomerKeys.CustomerQuery,
    useFactory: (connection: Connection) =>
      connection.getCustomRepository(CustomerQuery),
    inject: [DB_CONNECTION],
  },
];
