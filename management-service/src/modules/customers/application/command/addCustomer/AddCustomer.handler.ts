import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';

import { AppError, Either, left, Result, right } from 'shared/core';
import { UniqueEntityID } from 'shared/domain';

import { CustomerMap, CustomerRepository } from '../../../infra';
import { Customer } from '../../../domain';
import { CustomerAddedEvent } from '../../../domain/events';
import { FacilityRepository } from '../../../../facilities/infra';
import { AddCustomerCommand } from './AddCustomer.command';
import { AddCustomerErrors } from './AddCustomer.errors';
import { FacilityId } from '../../../../facilities/domain';

export type AddCustomerResponse = Either<
  | AppError.ValidationError
  | AppError.UnexpectedError
  | AddCustomerErrors.FacilityNotFoundError,
  Result<Customer>
>;

@CommandHandler(AddCustomerCommand)
export class AddCustomerHandler
  implements ICommandHandler<AddCustomerCommand, AddCustomerResponse> {
  constructor(
    private customerRepository: CustomerRepository,
    private facilityRepository: FacilityRepository,
    private publisher: EventPublisher,
  ) {}

  async execute({
    facilityId,
    dto,
  }: AddCustomerCommand): Promise<AddCustomerResponse> {
    try {
      const facilityExists = await this.facilityRepository.exists(facilityId);
      if (!facilityExists) {
        return left(new AddCustomerErrors.FacilityNotFoundError());
      }

      const customerOrError = CustomerMap.dtoToDomain(dto, facilityId);

      if (!customerOrError.isSuccess) {
        return left(Result.fail(customerOrError.error));
      }

      let customer = customerOrError.getValue();
      const entity = await this.customerRepository.persist(customer);
      await entity.save();

      customer = this.publisher.mergeObjectContext(customer);
      customer.apply(
        new CustomerAddedEvent(
          FacilityId.create(new UniqueEntityID(facilityId)).getValue(),
          customer.customerId,
        ),
      );
      customer.commit();

      return right(Result.ok(customer));
    } catch (err) {
      return left(new AppError.UnexpectedError(err));
    }
  }
}
