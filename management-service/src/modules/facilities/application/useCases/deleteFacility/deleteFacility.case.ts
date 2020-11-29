import { InjectRepository } from '@nestjs/typeorm';
import { EventPublisher } from '@nestjs/cqrs';

import { AppError, Either, left, Result, right, UseCase } from 'shared/core';

import { DeleteFacilityErrors } from './deleteFacility.errors';
import { DeleteFacilityDto } from './deleteFacility.dto';
import { FacilityRepository } from '../../../adapter';
import { FacilityFactory } from '../../factories';
import { FacilityRemovedEvent } from '../../../../enterprise/domain/events';

export type DeleteFacilityResponse = Either<
  AppError.UnexpectedError | DeleteFacilityErrors.FacilityNotFoundError,
  Result<void>
>;

export class DeleteFacilityCase
  implements UseCase<DeleteFacilityDto, Promise<DeleteFacilityResponse>> {
  constructor(
    @InjectRepository(FacilityRepository)
    private repository: FacilityRepository,
    private factory: FacilityFactory,
    private publisher: EventPublisher,
  ) {}

  async execute({
    facilityId,
  }: DeleteFacilityDto): Promise<DeleteFacilityResponse> {
    try {
      const facilityExists = await this.repository.exists(facilityId);
      if (!facilityExists) {
        return left(new DeleteFacilityErrors.FacilityNotFoundError());
      }

      const model = await this.factory.buildFromRepository(facilityId);

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
