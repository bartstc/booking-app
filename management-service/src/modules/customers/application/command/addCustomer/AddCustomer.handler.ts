import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { AppError, Either, left, Result, right } from 'shared/core';

import { CustomerMap } from '../../../adapter';
import { Customer, CustomerRepository } from '../../../domain';
import { FacilityRepository } from '../../../../facilities/domain';
import { AddCustomerCommand } from './AddCustomer.command';
import { AddCustomerErrors } from './AddCustomer.errors';
import { CustomerKeys } from '../../../CustomerKeys';
import { FacilityKeys } from '../../../../facilities/FacilityKeys';

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
    @Inject(CustomerKeys.CustomerRepository)
    private customerRepository: CustomerRepository,
    @Inject(FacilityKeys.FacilityRepository)
    private facilityRepository: FacilityRepository,
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

      const customer = customerOrError.getValue();
      const entity = await this.customerRepository.persist(customer);
      await entity.save();

      return right(Result.ok(customer));
    } catch (err) {
      return left(new AppError.UnexpectedError(err));
    }
  }
}
