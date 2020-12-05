import { InjectRepository } from '@nestjs/typeorm';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';

import { AppError, Either, left, Result, right } from 'shared/core';

import { Customer } from '../../../domain';
import { CustomerRepository } from '../../../infra';
import { CustomerRemovedEvent } from '../../../domain/events';
import { RemoveCustomerErrors } from './RemoveCustomer.errors';
import { RemoveCustomerCommand } from './RemoveCustomer.command';

export type RemoveCustomerResponse = Either<
  AppError.UnexpectedError | RemoveCustomerErrors.CustomerNotFoundError,
  Result<void>
>;

@CommandHandler(RemoveCustomerCommand)
export class RemoveCustomerHandler
  implements ICommandHandler<RemoveCustomerCommand, RemoveCustomerResponse> {
  constructor(
    @InjectRepository(CustomerRepository)
    private repository: CustomerRepository,
    private publisher: EventPublisher,
  ) {}

  async execute({
    customerId,
  }: RemoveCustomerCommand): Promise<RemoveCustomerResponse> {
    let model: Customer;

    try {
      try {
        model = await this.repository.getCustomerById(customerId);
      } catch {
        return left(new RemoveCustomerErrors.CustomerNotFoundError());
      }

      const customer = this.publisher.mergeObjectContext(model);
      customer.apply(new CustomerRemovedEvent(customer.facilityId, customerId));
      customer.commit();

      return right(Result.ok());
    } catch (err) {
      return left(new AppError.UnexpectedError(err));
    }
  }
}
