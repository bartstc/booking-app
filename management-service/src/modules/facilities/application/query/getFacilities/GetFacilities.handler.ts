import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';

import { AppError, Either, left, Result, right } from 'shared/core';

import { FacilityDto } from '../../dto';
import { FacilityKeys } from '../../../FacilityKeys';
import { FacilityQuery } from '../../../adapter';
import { EnterpriseKeys } from '../../../../enterprise/EnterpriseKeys';
import { EnterpriseRepository } from '../../../../enterprise/domain/repositories';
import { GetFacilitiesErrors } from './GetFacilities.errors';
import { GetFacilitiesQuery } from './GetFacilities.query';

export type GetFacilitiesResponse = Either<
  AppError.UnexpectedError | GetFacilitiesErrors.EnterpriseNotFoundError,
  Result<FacilityDto[]>
>;

@QueryHandler(GetFacilitiesQuery)
export class GetFacilitiesHandler
  implements IQueryHandler<GetFacilitiesQuery, GetFacilitiesResponse> {
  constructor(
    @Inject(FacilityKeys.FacilityQuery)
    private facilityQuery: FacilityQuery,
    @Inject(EnterpriseKeys.EnterpriseRepository)
    private enterpriseRepository: EnterpriseRepository,
  ) {}

  async execute({
    enterpriseId,
    params,
  }: GetFacilitiesQuery): Promise<GetFacilitiesResponse> {
    let dto;

    try {
      const enterpriseExists = await this.enterpriseRepository.exists(
        enterpriseId,
      );
      if (!enterpriseExists) {
        return left(
          new GetFacilitiesErrors.EnterpriseNotFoundError(enterpriseId),
        );
      }

      try {
        dto = await this.facilityQuery.getFacilities(enterpriseId, params);
      } catch (err) {
        return left(new AppError.UnexpectedError(err));
      }

      return right(Result.ok(dto));
    } catch (err) {
      return left(new AppError.UnexpectedError(err));
    }
  }
}
