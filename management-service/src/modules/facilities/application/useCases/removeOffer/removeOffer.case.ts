import { InjectRepository } from '@nestjs/typeorm';

import { AppError, Either, left, Result, right, UseCase } from 'shared/core';

import { FacilityRepository, OfferRepository } from '../../../adapter';
import { RemoveOfferErrors } from './removeOffer.errors';
import { RemoveOfferDto } from './removeOffer.dto';
import { FacilityFactory } from '../../factories';

export type RemoveOfferResponse = Either<
  | AppError.UnexpectedError
  | RemoveOfferErrors.FacilityNotFoundError
  | RemoveOfferErrors.OfferNotFoundError,
  Result<void>
>;

export class RemoveOfferCase
  implements UseCase<RemoveOfferDto, Promise<RemoveOfferResponse>> {
  constructor(
    @InjectRepository(FacilityRepository)
    private facilityRepository: FacilityRepository,
    @InjectRepository(OfferRepository)
    private offerRepository: OfferRepository,
    private facilityFactory: FacilityFactory,
  ) {}

  async execute({
    facilityId,
    offerId,
  }: RemoveOfferDto): Promise<RemoveOfferResponse> {
    try {
      const facilityExists = await this.facilityRepository.exists(facilityId);
      if (!facilityExists) {
        return left(new RemoveOfferErrors.FacilityNotFoundError());
      }

      const offerExists = await this.offerRepository.exists(offerId);
      if (!offerExists) {
        return left(new RemoveOfferErrors.OfferNotFoundError());
      }

      const offer = await this.offerRepository.getOfferById(offerId);
      const facility = await this.facilityFactory.buildFromRepository(
        facilityId,
      );
      facility.removeOffer(offer);

      await this.offerRepository.deleteOffer(offerId);
      await this.facilityRepository.persistModel(facility);

      return right(Result.ok());
    } catch (err) {
      return left(new AppError.UnexpectedError(err));
    }
  }
}
