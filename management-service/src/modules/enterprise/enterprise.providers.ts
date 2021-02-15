import { Provider } from '@nestjs/common';
import { Connection } from 'typeorm/index';

import { EnterpriseKeys } from './EnterpriseKeys';
import { EnterpriseQuery, EnterpriseRepository } from './infra';
import { InfrastructureKeys } from '../../InfrastructureKeys';
import { LoggerService } from '../../logger';

export const providers: Provider[] = [
  {
    provide: EnterpriseKeys.EnterpriseRepository,
    useFactory: (connection: Connection) =>
      connection.getCustomRepository(EnterpriseRepository),
    inject: [InfrastructureKeys.DbService],
  },
  {
    provide: EnterpriseKeys.EnterpriseQuery,
    useFactory: (connection: Connection) =>
      connection.getCustomRepository(EnterpriseQuery),
    inject: [InfrastructureKeys.DbService],
  },
  {
    provide: InfrastructureKeys.EnterpriseLoggerService,
    useValue: new LoggerService('EnterpriseModule'),
  },
];
