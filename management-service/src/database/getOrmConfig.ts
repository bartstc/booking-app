import { ConnectionOptions } from 'typeorm/index';
import { ConfigService } from '@nestjs/config';

export function getOrmConfig(configService: ConfigService): ConnectionOptions {
  return {
    name: 'default',
    type: 'postgres',
    host: configService.get('POSTGRES_HOST'),
    port: configService.get('POSTGRES_PORT'),
    username: configService.get('POSTGRES_USER'),
    password: configService.get('POSTGRES_PASSWORD'),
    database: configService.get('POSTGRES_DB'),
    logging: false,
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    migrations: [__dirname + '/../resources/migrations/**/*{.ts,.js}'],
    cli: {
      migrationsDir: 'src/resources/migrations',
    },
  };
}
