import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { AppError, Either, left, Result, right } from 'shared/core';

import { ActivateOfferErrors } from './ActivateOffer.errors';
import { ActivateOfferCommand } from './ActivateOffer.command';
import { FacilityRepository, Offer, OfferRepository } from '../../../domain';
import { FacilityKeys } from '../../../FacilityKeys';

export type ActivateOfferResponse = Either<
  | AppError.UnexpectedError
  | ActivateOfferErrors.FacilityNotFoundError
  | ActivateOfferErrors.OfferNotFoundError
  | ActivateOfferErrors.OfferIsAlreadyActiveError,
  Result<void>
>;

@CommandHandler(ActivateOfferCommand)
export class ActivateOfferHandler
  implements ICommandHandler<ActivateOfferCommand, ActivateOfferResponse> {
  constructor(
    @Inject(FacilityKeys.FacilityRepository)
    private facilityRepository: FacilityRepository,
    @Inject(FacilityKeys.OfferRepository)
    private offerRepository: OfferRepository,
  ) {}

  async execute({
    facilityId,
    offerId,
  }: ActivateOfferCommand): Promise<ActivateOfferResponse> {
    let offer: Offer;

    try {
      const facilityExists = await this.facilityRepository.exists(facilityId);
      if (!facilityExists) {
        return left(new ActivateOfferErrors.FacilityNotFoundError());
      }

      try {
        offer = await this.offerRepository.getOfferById(offerId);
      } catch {
        return left(new ActivateOfferErrors.OfferNotFoundError());
      }

      if (offer.isActive) {
        return left(new ActivateOfferErrors.OfferIsAlreadyActiveError());
      }

      offer.activate();

      await this.offerRepository.persist(offer);

      return right(Result.ok());
    } catch (err) {
      return left(new AppError.UnexpectedError(err));
    }
  }
}
