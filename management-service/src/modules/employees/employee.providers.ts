import { Provider } from '@nestjs/common';
import { Connection } from 'typeorm/index';

import { InfrastructureKeys } from '../../InfrastructureKeys';
import { EmployeeKeys } from './EmployeeKeys';
import { EmployeeQuery, EmployeeRepository } from './infra';
import { LoggerService } from '../../logger';

export const providers: Provider[] = [
  {
    provide: EmployeeKeys.EmployeeRepository,
    useFactory: (connection: Connection) =>
      connection.getCustomRepository(EmployeeRepository),
    inject: [InfrastructureKeys.DbService],
  },
  {
    provide: EmployeeKeys.EmployeeQuery,
    useFactory: (connection: Connection) =>
      connection.getCustomRepository(EmployeeQuery),
    inject: [InfrastructureKeys.DbService],
  },
  {
    provide: InfrastructureKeys.EmployeesLoggerService,
    useValue: new LoggerService('EmployeesModule'),
  },
];
