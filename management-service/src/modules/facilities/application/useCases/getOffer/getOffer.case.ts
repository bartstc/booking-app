import { Injectable } from '@nestjs/common';

import { AppError, Either, left, Result, right, UseCase } from 'shared/core';

import { OfferDto } from '../../dtos';
import { OfferMap, OfferRepository } from '../../../adapter';
import { GetOfferErrors } from './getOffer.errors';

type GetOfferResponse = Either<
  AppError.UnexpectedError | GetOfferErrors.OfferDoesNotExistError,
  Result<OfferDto>
>;

@Injectable()
export class GetOfferCase
  implements UseCase<string, Promise<GetOfferResponse>> {
  constructor(private repository: OfferRepository) {}

  async execute(offerId: string): Promise<GetOfferResponse> {
    let rawOffer;

    try {
      try {
        rawOffer = await this.repository.getRawOfferById(offerId);
      } catch {
        return left(new GetOfferErrors.OfferDoesNotExistError(offerId));
      }

      return right(Result.ok(OfferMap.rawToDto(rawOffer)));
    } catch (err) {
      return left(new AppError.UnexpectedError(err));
    }
  }
}
