import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { AppError, Either, left, Result, right } from 'shared/core';

import { DeactivateOfferErrors } from './DeactivateOffer.errors';
import { DeactivateOfferCommand } from './DeactivateOffer.command';
import { FacilityRepository, Offer, OfferRepository } from '../../../domain';
import { FacilityKeys } from '../../../FacilityKeys';
import { OfferIsAlreadyInactiveGuard } from '../../guards';
import { InfrastructureKeys } from '../../../../../InfrastructureKeys';
import { IAmqpService } from '../../../../../amqp';
import { FacilitiesEvent, OfferDeactivatedEvent } from '../../../domain/events';

export type DeactivateOfferResponse = Either<
  | AppError.UnexpectedError
  | DeactivateOfferErrors.FacilityNotFoundError
  | DeactivateOfferErrors.OfferNotFoundError
  | OfferIsAlreadyInactiveGuard,
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
    @Inject(InfrastructureKeys.AmqpService)
    private amqpService: IAmqpService,
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

      if (!offer.isActive) {
        return left(new OfferIsAlreadyInactiveGuard());
      }

      offer.deactivate();

      const entity = await this.offerRepository.persist(offer);

      await this.amqpService.sendMessage(
        new OfferDeactivatedEvent(),
        FacilitiesEvent.OfferDeactivated,
      );

      await entity.save();

      return right(Result.ok());
    } catch (err) {
      return left(new AppError.UnexpectedError(err));
    }
  }
}
