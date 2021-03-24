import { Inject, Injectable } from '@nestjs/common';

import { InfrastructureKeys } from '../InfrastructureKeys';
import { IConfigService } from '../config';

enum ExchangeName {
  OFFER_ADDED = 'Management.Facilities.Events:OfferAdded',
  EMPLOYEE_ADDED = 'Management.Facilities.Events:EmployeeAdded',
  OFFER_ACTIVATED = 'Management.Facilities.Events:OfferActivated',
  OFFER_DEACTIVATED = 'Management.Facilities.Events:OfferDeactivated',
  EMPLOYEE_ACTIVATED = 'Management.Facilities.Events:EmployeeActivated',
  EMPLOYEE_DEACTIVATED = 'Management.Facilities.Events:EmployeeDeactivated',
}

@Injectable()
export class MassTransitTransformer {
  constructor(
    @Inject(InfrastructureKeys.ConfigService)
    private readonly config: IConfigService,
  ) {}

  static toMessage<T = any>(message: T, key: string) {
    return {
      message,
      messageType: [`urn:message:${this.getExchangeName(key)}`],
    };
  }

  static getExchangeName(key: string): string {
    this.assertExchangeName(key);
    return ExchangeName[key.toUpperCase()];
  }

  private static assertExchangeName(key: string) {
    if (!Object.keys(ExchangeName).includes(key.toUpperCase())) {
      throw new Error(`Exchange ${key} is not defined`);
    }
  }
}
