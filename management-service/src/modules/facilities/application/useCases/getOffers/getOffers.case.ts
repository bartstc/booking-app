import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { AppError, Either, left, Result, right, UseCase } from 'shared/core';

import { OfferDto } from '../../dtos';
import { OfferMap, OfferRepository } from '../../../adapter';

type GetOffersResponse = Either<AppError.UnexpectedError, Result<OfferDto[]>>;

@Injectable()
export class GetOffersCase
  implements UseCase<string, Promise<GetOffersResponse>> {
  constructor(
    @InjectRepository(OfferRepository)
    private repository: OfferRepository,
  ) {}

  async execute(facilityId: string): Promise<GetOffersResponse> {
    let rawOffers;

    try {
      try {
        rawOffers = await this.repository.getRawAllOffers(facilityId);
      } catch (err) {
        return left(new AppError.UnexpectedError(err));
      }

      return right(Result.ok(OfferMap.rawToDtoBulk(rawOffers)));
    } catch (err) {
      return left(new AppError.UnexpectedError(err));
    }
  }
}
