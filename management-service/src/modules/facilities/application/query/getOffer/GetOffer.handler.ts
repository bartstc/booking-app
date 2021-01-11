import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';

import { AppError, Either, left, Result, right } from 'shared/core';

import { OfferDto } from '../../dto';
import { FacilityKeys } from '../../../FacilityKeys';
import { OfferQuery } from '../../../adapter';
import { FacilityRepository } from '../../../domain/repositories';
import { GetOfferErrors } from './GetOffer.errors';
import { GetOfferQuery } from './GetOffer.query';

export type GetOfferResponse = Either<
  AppError.UnexpectedError | GetOfferErrors.OfferDoesNotExistError,
  Result<OfferDto>
>;

@QueryHandler(GetOfferQuery)
export class GetOfferHandler
  implements IQueryHandler<GetOfferQuery, GetOfferResponse> {
  constructor(
    @Inject(FacilityKeys.OfferQuery)
    private offerQuery: OfferQuery,
    @Inject(FacilityKeys.FacilityRepository)
    private facilityRepository: FacilityRepository,
  ) {}

  async execute({
    facilityId,
    offerId,
  }: GetOfferQuery): Promise<GetOfferResponse> {
    let dto;

    try {
      const facilityExists = await this.facilityRepository.exists(facilityId);
      if (!facilityExists) {
        return left(new GetOfferErrors.FacilityNotFoundError(facilityId));
      }

      try {
        dto = await this.offerQuery.getOfferById(offerId);
      } catch {
        return left(new GetOfferErrors.OfferDoesNotExistError(offerId));
      }

      return right(Result.ok(dto));
    } catch (err) {
      return left(new AppError.UnexpectedError(err));
    }
  }
}
