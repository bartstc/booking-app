import { Module, Provider } from '@nestjs/common';
import { createConnection } from 'typeorm/index';
import { ConfigService } from '@nestjs/config';

import { InfrastructureKeys } from '../InfrastructureKeys';
import { getOrmConfig } from './getOrmConfig';

const DbService: Provider = {
  provide: InfrastructureKeys.DbService,
  inject: [ConfigService],
  useFactory: async (configService: ConfigService) =>
    await createConnection(getOrmConfig(configService)),
};

@Module({
  providers: [DbService, ConfigService],
  exports: [DbService],
})
export class DatabaseModule {}
