import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

import { InfrastructureKeys } from '../InfrastructureKeys';
import { RabbitService } from './RabbitService';

@Injectable()
export class RabbitMQService implements RabbitService {
  constructor(
    @Inject(InfrastructureKeys.RabbitMQClientProxy)
    private readonly client: ClientProxy,
  ) {}

  public emit<Event>(pattern: string, event: Event) {
    return this.client.emit(pattern, event).toPromise();
  }
}
