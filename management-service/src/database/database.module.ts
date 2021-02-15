import { Module, Provider } from '@nestjs/common';
import { createConnection } from 'typeorm/index';

import { InfrastructureKeys } from '../InfrastructureKeys';
import { ConfigModule, IConfigService } from '../config';
import { getOrmConfig } from './getOrmConfig';

const DbService: Provider = {
  provide: InfrastructureKeys.DbService,
  inject: [InfrastructureKeys.ConfigService],
  useFactory: async (configService: IConfigService) =>
    await createConnection(getOrmConfig(configService)),
};

@Module({
  imports: [ConfigModule],
  providers: [DbService],
  exports: [DbService],
})
export class DatabaseModule {}
