import { Module } from '@nestjs/common';
import { createConnection } from 'typeorm/index';

import * as ormconfig from './ormconfig';
import { InfrastructureKeys } from './InfrastructureKeys';

const dbProviders = [
  {
    provide: InfrastructureKeys.DbModule,
    useFactory: async () => await createConnection(ormconfig),
  },
];

@Module({
  providers: [...dbProviders],
  exports: [...dbProviders],
})
export class DbModule {}
