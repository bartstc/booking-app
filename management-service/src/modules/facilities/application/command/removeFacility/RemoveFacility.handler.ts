import { InjectRepository } from '@nestjs/typeorm';
import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';

import { AppError, Either, left, Result, right } from 'shared/core';

import { FacilityRemovedEvent } from '../../../../enterprise/domain/events';
import { RemoveFacilityErrors } from './RemoveFacility.errors';
import { RemoveFacilityCommand } from './RemoveFacility.command';
import { FacilityRepository } from '../../../infra';
import { Facility } from '../../../domain';

export type RemoveFacilityResponse = Either<
  AppError.UnexpectedError | RemoveFacilityErrors.FacilityNotFoundError,
  Result<void>
>;

@CommandHandler(RemoveFacilityCommand)
export class RemoveFacilityHandler
  implements ICommandHandler<RemoveFacilityCommand, RemoveFacilityResponse> {
  constructor(
    @InjectRepository(FacilityRepository)
    private repository: FacilityRepository,
    private publisher: EventPublisher,
  ) {}

  async execute({
    facilityId,
  }: RemoveFacilityCommand): Promise<RemoveFacilityResponse> {
    let model: Facility;

    try {
      try {
        model = await this.repository.getFacilityById(facilityId);
      } catch {
        return left(new RemoveFacilityErrors.FacilityNotFoundError());
      }

      await this.repository.deleteFacility(facilityId);

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
