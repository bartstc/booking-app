import fetch from 'node-fetch';
import { Inject, Injectable } from '@nestjs/common';

import { IAuthService } from './IAuthService';
import { InfrastructureKeys } from '../InfrastructureKeys';
import { ILoggerService } from '../logger';
import { IConfigService } from '../config';

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    @Inject(InfrastructureKeys.LoggerService)
    private readonly logger: ILoggerService,
    @Inject(InfrastructureKeys.ConfigService)
    private readonly config: IConfigService,
  ) {}

  public async signup(email: string, password: string): Promise<void> {
    try {
      const result = await fetch(
        `${this.config.auth.authDomain}/dbconnections/signup`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            client_id: this.config.auth.employeeWebClientAuthClientId,
            email,
            password,
            connection: this.config.auth.authDbConnection,
            user_metadata: {
              contextType: 'employee',
            },
          }),
        },
      );
    } catch (error) {
      this.logger.error(error.message, error.stack);
    }
  }
}
