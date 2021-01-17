import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';

import { AppError, Either, left, Result, right } from 'shared/core';

import { FacilityDto } from '../../dto';
import { FacilityKeys } from '../../../FacilityKeys';
import { FacilityQuery } from '../../../adapter';
import { GetFacilityBySlugErrors } from './GetFacilityBySlug.errors';
import { GetFacilityBySlugQuery } from './GetFacilityBySlug.query';

export type GetFacilityBySlugResponse = Either<
  GetFacilityBySlugErrors.FacilityDoesNotExistError | AppError.UnexpectedError,
  Result<FacilityDto>
>;

@QueryHandler(GetFacilityBySlugQuery)
export class GetFacilityBySlugHandler
  implements IQueryHandler<GetFacilityBySlugQuery, GetFacilityBySlugResponse> {
  constructor(
    @Inject(FacilityKeys.FacilityQuery) private facilityQuery: FacilityQuery,
  ) {}

  async execute({
    slug,
  }: GetFacilityBySlugQuery): Promise<GetFacilityBySlugResponse> {
    let dto;

    try {
      try {
        dto = await this.facilityQuery.getFacilityBySlug(slug);
      } catch {
        return left(
          new GetFacilityBySlugErrors.FacilityDoesNotExistError(slug),
        );
      }

      return right(Result.ok(dto));
    } catch (err) {
      return left(new AppError.UnexpectedError(err));
    }
  }
}
