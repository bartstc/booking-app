import { Inject, Injectable } from '@nestjs/common';

import { InfrastructureKeys } from '../InfrastructureKeys';
import { IConfigService } from '../config';

enum ExchangeName {
  OFFER_ADDED = 'Accessibility.Application.Facilities.IntegrationEvents.Events:OfferAdded',
  EMPLOYEE_ADDED = 'Accessibility.Application.Facilities.IntegrationEvents.Events:EmployeeAdded',
  OFFER_ACTIVATED = 'Accessibility.Application.Facilities.IntegrationEvents.Events:OfferActivated',
  OFFER_DEACTIVATED = 'Accessibility.Application.Facilities.IntegrationEvents.Events:OfferDeactivated',
  EMPLOYEE_ACTIVATED = 'Accessibility.Application.Facilities.IntegrationEvents.Events:EmployeeActivated',
  EMPLOYEE_DEACTIVATED = 'Accessibility.Application.Facilities.IntegrationEvents.Events:EmployeeDeactivated',
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
