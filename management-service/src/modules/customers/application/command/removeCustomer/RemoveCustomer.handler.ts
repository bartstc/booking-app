import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { AppError, Either, left, Result, right } from 'shared/core';

import { RemoveCustomerErrors } from './RemoveCustomer.errors';
import { RemoveCustomerCommand } from './RemoveCustomer.command';
import { CustomerKeys } from '../../../CustomerKeys';
import { CustomerRepository } from '../../../domain';
import { FacilityKeys } from '../../../../facilities/FacilityKeys';
import { FacilityRepository } from '../../../../facilities/domain';

export type RemoveCustomerResponse = Either<
  AppError.UnexpectedError | RemoveCustomerErrors.CustomerNotFoundError,
  Result<void>
>;

@CommandHandler(RemoveCustomerCommand)
export class RemoveCustomerHandler
  implements ICommandHandler<RemoveCustomerCommand, RemoveCustomerResponse> {
  constructor(
    @Inject(CustomerKeys.CustomerRepository)
    private customerRepository: CustomerRepository,
    @Inject(FacilityKeys.FacilityRepository)
    private facilityRepository: FacilityRepository,
  ) {}

  async execute({
    facilityId,
    customerId,
  }: RemoveCustomerCommand): Promise<RemoveCustomerResponse> {
    try {
      const facilityExists = await this.facilityRepository.exists(facilityId);
      if (!facilityExists) {
        return left(new RemoveCustomerErrors.FacilityNotFoundError());
      }

      const customerExists = await this.customerRepository.exists(customerId);
      if (!customerExists) {
        return left(new RemoveCustomerErrors.CustomerNotFoundError());
      }

      await this.customerRepository.removeCustomer(customerId);

      return right(Result.ok());
    } catch (err) {
      return left(new AppError.UnexpectedError(err));
    }
  }
}
