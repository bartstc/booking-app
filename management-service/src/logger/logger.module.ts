import { Provider, Module } from '@nestjs/common';

import { InfrastructureKeys } from '../InfrastructureKeys';
import { LoggerService } from './logger.service';

const loggerServiceProvider: Provider = {
  provide: InfrastructureKeys.LoggerService,
  useValue: new LoggerService('AppModule'),
};

@Module({
  providers: [loggerServiceProvider],
  exports: [loggerServiceProvider],
})
export class LoggerModule {}
