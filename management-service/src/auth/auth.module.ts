import { Module, Provider } from '@nestjs/common';
import { InfrastructureKeys } from '../InfrastructureKeys';
import { ILoggerService, LoggerService } from '../logger';
import { ConfigModule, IConfigService } from '../config';
import { AuthService } from './auth.service';

const authServiceProvider: Provider = {
  provide: InfrastructureKeys.AuthService,
  inject: [
    InfrastructureKeys.AuthLoggerService,
    InfrastructureKeys.ConfigService,
  ],
  useFactory: (loggerService: ILoggerService, configService: IConfigService) =>
    new AuthService(loggerService, configService),
};

@Module({
  imports: [ConfigModule],
  providers: [
    authServiceProvider,
    {
      provide: InfrastructureKeys.AuthLoggerService,
      useValue: new LoggerService('AuthModule'),
    },
  ],
  exports: [authServiceProvider],
})
export class AuthModule {}
