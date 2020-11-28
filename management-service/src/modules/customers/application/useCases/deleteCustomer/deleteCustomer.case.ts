import { InjectRepository } from '@nestjs/typeorm';
import { EventPublisher } from '@nestjs/cqrs';

import { AppError, Either, left, Result, right, UseCase } from 'shared/core';

import { CustomerRepository } from '../../../adapter';
import { Customer } from '../../../domain';
import { CustomerDeletedEvent } from '../../../../facilities/application/events';
import { DeleteCustomerErrors } from './deleteCustomer.errors';
import { DeleteCustomerDto } from './deleteCustomer.dto';

export type DeleteCustomerResponse = Either<
  AppError.UnexpectedError | DeleteCustomerErrors.CustomerNotFoundError,
  Result<void>
>;

export class DeleteCustomerCase
  implements UseCase<DeleteCustomerDto, Promise<DeleteCustomerResponse>> {
  constructor(
    @InjectRepository(CustomerRepository)
    private repository: CustomerRepository,
    private publisher: EventPublisher,
  ) {}

  async execute({
    customerId,
  }: DeleteCustomerDto): Promise<DeleteCustomerResponse> {
    let model: Customer;

    try {
      try {
        model = await this.repository.getCustomerById(customerId);
      } catch {
        return left(new DeleteCustomerErrors.CustomerNotFoundError());
      }

      const customer = this.publisher.mergeObjectContext(model);
      customer.apply(new CustomerDeletedEvent(customer.facilityId, customerId));
      customer.commit();

      return right(Result.ok());
    } catch (err) {
      return left(new AppError.UnexpectedError(err));
    }
  }
}
