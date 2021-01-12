import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';

import { AppError, Either, left, Result, right } from 'shared/core';

import { CustomerKeys } from '../../../CustomerKeys';
import { CustomerQuery } from '../../../adapter';
import { FacilityKeys } from '../../../../facilities/FacilityKeys';
import { FacilityRepository } from '../../../../facilities/domain/repositories';
import { CustomerCollectionDto } from '../../dto';
import { GetCustomersQuery } from './GetCustomers.query';
import { GetCustomersErrors } from './GetCustomers.errors';

type GetCustomersResponse = Either<
  AppError.UnexpectedError | GetCustomersErrors.FacilityDoesNotExistError,
  Result<CustomerCollectionDto>
>;

@QueryHandler(GetCustomersQuery)
export class GetCustomersHandler
  implements IQueryHandler<GetCustomersQuery, GetCustomersResponse> {
  constructor(
    @Inject(CustomerKeys.CustomerQuery)
    private readonly customerQuery: CustomerQuery,
    @Inject(FacilityKeys.FacilityRepository)
    private readonly facilityRepository: FacilityRepository,
  ) {}

  async execute({
    facilityId,
    params,
  }: GetCustomersQuery): Promise<GetCustomersResponse> {
    let dto;

    try {
      const facilityExists = await this.facilityRepository.exists(facilityId);
      if (!facilityExists) {
        return left(
          new GetCustomersErrors.FacilityDoesNotExistError(facilityId),
        );
      }

      try {
        dto = await this.customerQuery.getCustomers(facilityId, params);
      } catch (err) {
        return left(new AppError.UnexpectedError(err));
      }

      return right(Result.ok(dto));
    } catch (err) {
      return left(new AppError.UnexpectedError(err));
    }
  }
}
