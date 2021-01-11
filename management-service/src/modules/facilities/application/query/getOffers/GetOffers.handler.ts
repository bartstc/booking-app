import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';

import { AppError, Either, left, Result, right } from 'shared/core';

import { OfferDto } from '../../dto';
import { FacilityKeys } from '../../../FacilityKeys';
import { OfferQuery } from '../../../adapter';
import { FacilityRepository } from '../../../domain/repositories';
import { GetOffersQuery } from './GetOffers.query';
import { GetOffersErrors } from './GetOffers.errors';

export type GetOffersResponse = Either<
  AppError.UnexpectedError | GetOffersErrors.FacilityNotFoundError,
  Result<OfferDto[]>
>;

@QueryHandler(GetOffersQuery)
export class GetOffersHandler
  implements IQueryHandler<GetOffersQuery, GetOffersResponse> {
  constructor(
    @Inject(FacilityKeys.OfferQuery)
    private offerQuery: OfferQuery,
    @Inject(FacilityKeys.FacilityRepository)
    private facilityRepository: FacilityRepository,
  ) {}

  async execute({ facilityId }: GetOffersQuery): Promise<GetOffersResponse> {
    let dto;

    try {
      const facilityExists = await this.facilityRepository.exists(facilityId);
      if (!facilityExists) {
        return left(new GetOffersErrors.FacilityNotFoundError(facilityId));
      }

      try {
        dto = await this.offerQuery.getFacilityOffers(facilityId);
      } catch (err) {
        return left(new AppError.UnexpectedError(err));
      }

      return right(Result.ok(dto));
    } catch (err) {
      return left(new AppError.UnexpectedError(err));
    }
  }
}
