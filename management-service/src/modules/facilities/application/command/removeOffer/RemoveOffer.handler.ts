import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Connection } from 'typeorm/index';

import { AppError, Either, left, Result, right } from 'shared/core';

import { RemoveOfferErrors } from './RemoveOffer.errors';
import { RemoveOfferCommand } from './RemoveOffer.command';
import {
  Facility,
  FacilityRepository,
  Offer,
  OfferRepository,
} from '../../../domain';
import { EntityName } from '../../../adapter';
import { FacilityKeys } from '../../../FacilityKeys';
import { CannotRemoveActiveOfferGuard } from '../../guards';
import { InfrastructureKeys } from '../../../../../InfrastructureKeys';

export type RemoveOfferResponse = Either<
  | AppError.UnexpectedError
  | RemoveOfferErrors.FacilityNotFoundError
  | RemoveOfferErrors.OfferNotFoundError,
  Result<void>
>;

@CommandHandler(RemoveOfferCommand)
export class RemoveOfferHandler
  implements ICommandHandler<RemoveOfferCommand, RemoveOfferResponse> {
  constructor(
    @Inject(InfrastructureKeys.DbService)
    private connection: Connection,
    @Inject(FacilityKeys.FacilityRepository)
    private facilityRepository: FacilityRepository,
    @Inject(FacilityKeys.OfferRepository)
    private offerRepository: OfferRepository,
  ) {}

  async execute({
    facilityId,
    offerId,
  }: RemoveOfferCommand): Promise<RemoveOfferResponse> {
    const queryRunner = this.connection.createQueryRunner();

    let facility: Facility;
    let offer: Offer;

    try {
      try {
        facility = await this.facilityRepository.getFacilityById(facilityId);
      } catch {
        return left(new RemoveOfferErrors.FacilityNotFoundError());
      }

      try {
        offer = await this.offerRepository.getOfferById(offerId);
      } catch {
        return left(new RemoveOfferErrors.OfferNotFoundError());
      }

      if (offer.isActive) {
        return left(new CannotRemoveActiveOfferGuard());
      }

      facility.removeOffer(offer);

      await queryRunner.connect();
      await queryRunner.startTransaction();

      await queryRunner.manager.delete(EntityName.Offer, {
        offer_id: offerId,
      });
      await queryRunner.manager.save(
        await this.facilityRepository.persist(facility),
      );

      await queryRunner.commitTransaction();

      return right(Result.ok());
    } catch (err) {
      await queryRunner.rollbackTransaction();
      return left(new AppError.UnexpectedError(err));
    } finally {
      await queryRunner.release();
    }
  }
}
