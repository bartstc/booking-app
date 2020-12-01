import { InjectRepository } from '@nestjs/typeorm';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';

import { AppError, Either, left, Result, right } from 'shared/core';

import { RemoveFacilityErrors } from './RemoveFacility.errors';
import { RemoveFacilityCommand } from './RemoveFacility.command';
import { FacilityRepository } from '../../../infra';
import { Facility } from '../../../domain';

import { FacilityRemovedEvent } from '../../../../enterprise/domain/events';
import { EnterpriseRepository } from '../../../../enterprise/infra';

export type RemoveFacilityResponse = Either<
  AppError.UnexpectedError | RemoveFacilityErrors.FacilityNotFoundError,
  Result<void>
>;

@CommandHandler(RemoveFacilityCommand)
export class RemoveFacilityHandler
  implements ICommandHandler<RemoveFacilityCommand, RemoveFacilityResponse> {
  constructor(
    @InjectRepository(FacilityRepository)
    private facilityRepository: FacilityRepository,
    private enterpriseRepository: EnterpriseRepository,
    private publisher: EventPublisher,
  ) {}

  async execute({
    facilityId,
    enterpriseId,
  }: RemoveFacilityCommand): Promise<RemoveFacilityResponse> {
    let model: Facility;

    try {
      const enterpriseExists = await this.enterpriseRepository.exists(
        enterpriseId,
      );
      if (!enterpriseExists) {
        return left(new RemoveFacilityErrors.EnterpriseDoesNotExist());
      }

      try {
        model = await this.facilityRepository.getFacilityById(facilityId);
      } catch {
        return left(new RemoveFacilityErrors.FacilityNotFoundError());
      }

      await this.facilityRepository.deleteFacility(facilityId);

      const facility = this.publisher.mergeObjectContext(model);
      facility.apply(
        new FacilityRemovedEvent(facility.enterpriseId, facilityId),
      );
      facility.commit();

      return right(Result.ok());
    } catch (err) {
      return left(new AppError.UnexpectedError(err));
    }
  }
}
