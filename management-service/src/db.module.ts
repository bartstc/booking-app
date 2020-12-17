import { Module } from '@nestjs/common';
import { createConnection } from 'typeorm/index';

import * as ormconfig from './ormconfig';
import { DB_CONNECTION } from './constants';

const dbProviders = [
  {
    provide: DB_CONNECTION,
    useFactory: async () => await createConnection(ormconfig),
  },
];

@Module({
  providers: [...dbProviders],
  exports: [...dbProviders],
})
export class DbModule {}
