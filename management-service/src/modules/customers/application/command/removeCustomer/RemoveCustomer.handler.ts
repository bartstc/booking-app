import { InjectRepository } from '@nestjs/typeorm';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';

import { AppError, Either, left, Result, right } from 'shared/core';
import { UniqueEntityID } from 'shared/domain';

import { Customer } from '../../../domain';
import { CustomerRepository } from '../../../infra';
import { CustomerRemovedEvent } from '../../../domain/events';
import { RemoveCustomerErrors } from './RemoveCustomer.errors';
import { RemoveCustomerCommand } from './RemoveCustomer.command';
import { FacilityRepository } from '../../../../facilities/infra';
import { FacilityId } from '../../../../facilities/domain';

export type RemoveCustomerResponse = Either<
  AppError.UnexpectedError | RemoveCustomerErrors.CustomerNotFoundError,
  Result<void>
>;

@CommandHandler(RemoveCustomerCommand)
export class RemoveCustomerHandler
  implements ICommandHandler<RemoveCustomerCommand, RemoveCustomerResponse> {
  constructor(
    @InjectRepository(CustomerRepository)
    private customerRepository: CustomerRepository,
    @InjectRepository(FacilityRepository)
    private facilityRepository: FacilityRepository,
    private publisher: EventPublisher,
  ) {}

  async execute({
    facilityId,
    customerId,
  }: RemoveCustomerCommand): Promise<RemoveCustomerResponse> {
    let model: Customer;

    try {
      const facilityExists = await this.facilityRepository.exists(facilityId);
      if (!facilityExists) {
        return left(new RemoveCustomerErrors.FacilityNotFoundError());
      }

      try {
        model = await this.customerRepository.getCustomerById(customerId);
      } catch {
        return left(new RemoveCustomerErrors.CustomerNotFoundError());
      }

      await this.customerRepository.removeCustomer(customerId);

      const customer = this.publisher.mergeObjectContext(model);
      customer.apply(
        new CustomerRemovedEvent(
          FacilityId.create(new UniqueEntityID(facilityId)).getValue(),
          customer.customerId,
        ),
      );
      customer.commit();

      return right(Result.ok());
    } catch (err) {
      return left(new AppError.UnexpectedError(err));
    }
  }
}
