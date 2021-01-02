import { Module } from '@nestjs/common';
import { Connection } from 'typeorm/index';

import { DB_CONNECTION } from '../../constants';
import { DictionaryQuery } from './infra';
import { DictionaryKeys } from './DictionaryKeys';
import { DbModule } from '../../db.module';
import { GetDictionariesController } from './application/query/getDictionaries';

@Module({
  imports: [DbModule],
  controllers: [GetDictionariesController],
  providers: [
    {
      provide: DictionaryKeys.DictionaryQuery,
      useFactory: (connection: Connection) =>
        connection.getCustomRepository(DictionaryQuery),
      inject: [DB_CONNECTION],
    },
  ],
})
export class DictionaryModule {}
