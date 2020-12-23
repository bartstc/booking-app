import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { AppError, Either, left, Result, right } from 'shared/core';

import { DeactivateOfferErrors } from './DeactivateOffer.errors';
import { DeactivateOfferCommand } from './DeactivateOffer.command';
import { FacilityRepository, Offer, OfferRepository } from '../../../domain';
import { FacilityKeys } from '../../../FacilityKeys';
import { OfferStatus } from '../../../domain/types';

export type DeactivateOfferResponse = Either<
  | AppError.UnexpectedError
  | DeactivateOfferErrors.FacilityNotFoundError
  | DeactivateOfferErrors.OfferNotFoundError
  | DeactivateOfferErrors.OfferIsAlreadyInactiveError,
  Result<void>
>;

@CommandHandler(DeactivateOfferCommand)
export class DeactivateOfferHandler
  implements ICommandHandler<DeactivateOfferCommand, DeactivateOfferResponse> {
  constructor(
    @Inject(FacilityKeys.FacilityRepository)
    private facilityRepository: FacilityRepository,
    @Inject(FacilityKeys.OfferRepository)
    private offerRepository: OfferRepository,
  ) {}

  async execute({
    facilityId,
    offerId,
  }: DeactivateOfferCommand): Promise<DeactivateOfferResponse> {
    let offer: Offer;

    try {
      const facilityExists = await this.facilityRepository.exists(facilityId);
      if (!facilityExists) {
        return left(new DeactivateOfferErrors.FacilityNotFoundError());
      }

      try {
        offer = await this.offerRepository.getOfferById(offerId);
      } catch {
        return left(new DeactivateOfferErrors.OfferNotFoundError());
      }

      if (offer.status === OfferStatus.Inactive) {
        return left(new DeactivateOfferErrors.OfferIsAlreadyInactiveError());
      }

      offer.deactivate();

      const entity = await this.offerRepository.persist(offer);
      await entity.save();

      return right(Result.ok());
    } catch (err) {
      return left(new AppError.UnexpectedError(err));
    }
  }
}
