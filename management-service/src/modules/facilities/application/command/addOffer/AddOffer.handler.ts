import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Connection } from 'typeorm/index';

import { AppError, Either, left, Result, right } from 'shared/core';
import { IAmqpService } from 'amqp';

import { Facility, FacilityRepository, OfferRepository } from '../../../domain';
import { AddOfferErrors } from './AddOffer.errors';
import { AddOfferCommand } from './AddOffer.command';
import { OfferMap } from '../../../adapter';
import { FacilityKeys } from '../../../FacilityKeys';
import { InfrastructureKeys } from '../../../../../InfrastructureKeys';
import { OfferTransformer } from '../../../infra/typeorm/offer';
import { FacilitiesEvent, OfferAddedEvent } from '../../../domain/events';

export type AddOfferResponse = Either<
  | AppError.ValidationError
  | AppError.UnexpectedError
  | AddOfferErrors.FacilityNotFoundError,
  Result<void>
>;

@CommandHandler(AddOfferCommand)
export class AddOfferHandler
  implements ICommandHandler<AddOfferCommand, AddOfferResponse> {
  constructor(
    @Inject(InfrastructureKeys.DbService)
    private connection: Connection,
    @Inject(InfrastructureKeys.AmqpService)
    private rabbitService: IAmqpService,
    @Inject(FacilityKeys.FacilityRepository)
    private facilityRepository: FacilityRepository,
    @Inject(FacilityKeys.OfferRepository)
    private offerRepository: OfferRepository,
  ) {}

  async execute({
    facilityId,
    dto,
  }: AddOfferCommand): Promise<AddOfferResponse> {
    const queryRunner = this.connection.createQueryRunner();

    let facility: Facility;

    try {
      try {
        facility = await this.facilityRepository.getFacilityById(facilityId);
      } catch {
        return left(new AddOfferErrors.FacilityNotFoundError());
      }

      const offerOrError = OfferMap.dtoToDomain(dto, facilityId);

      if (!offerOrError.isSuccess) {
        return left(Result.fail(offerOrError.error));
      }

      const offer = offerOrError.getValue();
      facility.addOffer(offer);

      await queryRunner.connect();
      await queryRunner.startTransaction();

      const offerEntity = await this.offerRepository.persist(offer);
      await queryRunner.manager.save(offerEntity);
      await queryRunner.manager.save(
        await this.facilityRepository.persist(facility),
      );

      await this.rabbitService.sendMessage(
        new OfferAddedEvent(OfferTransformer.toDto(offerEntity)),
        FacilitiesEvent.OfferAdded,
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
