import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';

import { AppError, Either, left, Result, right } from 'shared/core';

import { FacilityDto } from '../../dto';
import { FacilityKeys } from '../../../FacilityKeys';
import { FacilityQuery } from '../../../adapter';
import { GetFacilityByIdErrors } from './GetFacilityById.errors';
import { GetFacilityByIdQuery } from './GetFacilityById.query';

export type GetFacilityByIdResponse = Either<
  GetFacilityByIdErrors.FacilityDoesNotExistError | AppError.UnexpectedError,
  Result<FacilityDto>
>;

@QueryHandler(GetFacilityByIdQuery)
export class GetFacilityByIdHandler
  implements IQueryHandler<GetFacilityByIdQuery, GetFacilityByIdResponse> {
  constructor(
    @Inject(FacilityKeys.FacilityQuery) private facilityQuery: FacilityQuery,
  ) {}

  async execute({
    facilityId,
  }: GetFacilityByIdQuery): Promise<GetFacilityByIdResponse> {
    let dto;

    try {
      try {
        dto = await this.facilityQuery.getFacilityById(facilityId);
      } catch {
        return left(
          new GetFacilityByIdErrors.FacilityDoesNotExistError(facilityId),
        );
      }

      return right(Result.ok(dto));
    } catch (err) {
      return left(new AppError.UnexpectedError(err));
    }
  }
}
