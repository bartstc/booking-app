import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection } from 'typeorm/index';

import { AppError, Either, left, Result, right } from 'shared/core';

import { RemoveOfferErrors } from './RemoveOffer.errors';
import { RemoveOfferCommand } from './RemoveOffer.command';
import {
  EntityName,
  FacilityRepository,
  OfferRepository,
} from '../../../infra';
import { Facility, Offer } from '../../../domain';

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
    private connection: Connection,
    @InjectRepository(FacilityRepository)
    private facilityRepository: FacilityRepository,
    @InjectRepository(OfferRepository)
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
