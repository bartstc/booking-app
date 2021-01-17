import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';

import { AppError, Either, left, Result, right } from 'shared/core';

import { GetCustomerErrors } from './GetCustomer.errors';
import { GetCustomerQuery } from './GetCustomer.query';
import { CustomerKeys } from '../../../CustomerKeys';
import { CustomerQuery } from '../../../adapter';
import { CustomerDto } from '../../dto';

import { FacilityKeys } from '../../../../facilities/FacilityKeys';
import { FacilityRepository } from '../../../../facilities/domain/repositories';

type GetCustomerResponse = Either<
  | AppError.UnexpectedError
  | GetCustomerErrors.CustomerDoesNotExistError
  | GetCustomerErrors.FacilityDoesNotExistError,
  Result<CustomerDto>
>;

@QueryHandler(GetCustomerQuery)
export class GetCustomerHandler
  implements IQueryHandler<GetCustomerQuery, GetCustomerResponse> {
  constructor(
    @Inject(CustomerKeys.CustomerQuery)
    private readonly customerQuery: CustomerQuery,
    @Inject(FacilityKeys.FacilityRepository)
    private readonly facilityRepository: FacilityRepository,
  ) {}

  async execute({
    facilityId,
    customerId,
  }: GetCustomerQuery): Promise<GetCustomerResponse> {
    let dto;

    try {
      const facilityExists = await this.facilityRepository.exists(facilityId);
      if (!facilityExists) {
        return left(
          new GetCustomerErrors.FacilityDoesNotExistError(facilityId),
        );
      }

      try {
        dto = await this.customerQuery.getCustomerById(customerId);
      } catch {
        return left(
          new GetCustomerErrors.CustomerDoesNotExistError(customerId),
        );
      }

      return right(Result.ok(dto));
    } catch (err) {
      return left(new AppError.UnexpectedError(err));
    }
  }
}
