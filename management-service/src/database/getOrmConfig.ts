import { ConnectionOptions } from 'typeorm/index';

import { IConfigService } from '../config';

export function getOrmConfig(configService: IConfigService): ConnectionOptions {
  return {
    name: 'default',
    type: 'postgres',
    logging: false,
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    migrations: [__dirname + '/../resources/migrations/**/*{.ts,.js}'],
    cli: {
      migrationsDir: 'src/resources/migrations',
    },
    ...configService.db,
  };
}
