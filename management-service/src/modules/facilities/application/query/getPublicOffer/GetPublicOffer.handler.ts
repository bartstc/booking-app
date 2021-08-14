import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';

import { AppError, Either, left, Result, right } from 'shared/core';

import { OfferDto } from '../../dto';
import { FacilityKeys } from '../../../FacilityKeys';
import { OfferQuery } from '../../../adapter';
import { GetPublicOfferErrors } from './GetPublicOffer.errors';
import { GetPublicOfferQuery } from './GetPublicOffer.query';

export type GetPublicOfferResponse = Either<
  AppError.UnexpectedError | GetPublicOfferErrors.OfferDoesNotExistError,
  Result<OfferDto>
>;

@QueryHandler(GetPublicOfferQuery)
export class GetPublicOfferHandler
  implements IQueryHandler<GetPublicOfferQuery, GetPublicOfferResponse> {
  constructor(
    @Inject(FacilityKeys.OfferQuery)
    private offerQuery: OfferQuery,
  ) {}

  async execute({
    offerId,
  }: GetPublicOfferQuery): Promise<GetPublicOfferResponse> {
    let dto;

    try {
      try {
        dto = await this.offerQuery.getOfferById(offerId);
      } catch {
        return left(new GetPublicOfferErrors.OfferDoesNotExistError(offerId));
      }

      return right(Result.ok(dto));
    } catch (err) {
      return left(new AppError.UnexpectedError(err));
    }
  }
}
