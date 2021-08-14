import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Inject } from '@nestjs/common';

import { AppError, Either, left, Result, right } from 'shared/core';

import { OfferCollectionDto } from '../../dto';
import { FacilityKeys } from '../../../FacilityKeys';
import { OfferQuery } from '../../../adapter';
import { GetPublicOffersQuery } from './GetPublicOffers.query';

export type GetPublicOffersResponse = Either<
  AppError.UnexpectedError,
  Result<OfferCollectionDto>
>;

@QueryHandler(GetPublicOffersQuery)
export class GetPublicOffersHandler
  implements IQueryHandler<GetPublicOffersQuery, GetPublicOffersResponse> {
  constructor(
    @Inject(FacilityKeys.OfferQuery)
    private offerQuery: OfferQuery,
  ) {}

  async execute({
    params,
  }: GetPublicOffersQuery): Promise<GetPublicOffersResponse> {
    let dto;

    try {
      try {
        dto = await this.offerQuery.getPublicOffers(params);
      } catch (err) {
        return left(new AppError.UnexpectedError(err));
      }

      return right(Result.ok(dto));
    } catch (err) {
      return left(new AppError.UnexpectedError(err));
    }
  }
}
