import { Provider } from '@nestjs/common';
import { Connection } from 'typeorm/index';

import { EnterpriseKeys } from './EnterpriseKeys';
import { EnterpriseQuery, EnterpriseRepository } from './infra';
import { DB_CONNECTION } from '../../constants';

export const providers: Provider[] = [
  {
    provide: EnterpriseKeys.EnterpriseRepository,
    useFactory: (connection: Connection) =>
      connection.getCustomRepository(EnterpriseRepository),
    inject: [DB_CONNECTION],
  },
  {
    provide: EnterpriseKeys.EnterpriseQuery,
    useFactory: (connection: Connection) =>
      connection.getCustomRepository(EnterpriseQuery),
    inject: [DB_CONNECTION],
  },
];
