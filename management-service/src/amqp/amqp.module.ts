import { Module, Provider } from '@nestjs/common';

import { AmqpService } from './amqp.service';
import { InfrastructureKeys } from '../InfrastructureKeys';
import { ILoggerService, LoggerService } from '../logger';
import { ConfigModule, IConfigService } from '../config';

const amqpServiceProvider: Provider = {
  provide: InfrastructureKeys.AmqpService,
  inject: [
    InfrastructureKeys.AmqpLoggerService,
    InfrastructureKeys.ConfigService,
  ],
  useFactory: (loggerService: ILoggerService, configService: IConfigService) =>
    new AmqpService(loggerService, configService),
};

@Module({
  imports: [ConfigModule],
  providers: [
    amqpServiceProvider,
    {
      provide: InfrastructureKeys.AmqpLoggerService,
      useValue: new LoggerService('AmqpModule'),
    },
  ],
  exports: [amqpServiceProvider],
})
export class AmqpModule {}
