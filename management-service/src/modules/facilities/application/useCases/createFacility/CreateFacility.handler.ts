import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';

import { AppError, Either, left, Result, right } from 'shared/core';

import { Slug } from '../../../domain';
import { FacilityMap, FacilityRepository } from '../../../infra';
import { FacilityAddedEvent } from '../../../../enterprise/domain/events';
import { CreateFacilityCommand } from './CreateFacility.command';
import { CreateFacilityErrors } from './CreateFacility.errors';

export type CreateFacilityResponse = Either<
  AppError.ValidationError | AppError.UnexpectedError,
  Result<void>
>;

@CommandHandler(CreateFacilityCommand)
export class CreateFacilityHandler
  implements ICommandHandler<CreateFacilityCommand, CreateFacilityResponse> {
  constructor(
    private repository: FacilityRepository,
    private publisher: EventPublisher,
  ) {}

  async execute({
    dto,
    enterpriseId,
  }: CreateFacilityCommand): Promise<CreateFacilityResponse> {
    try {
      const slug = Slug.create({ value: dto.slug });
      const slugExists = await this.repository.slugExists(slug.getValue());

      if (slugExists) {
        return left(new CreateFacilityErrors.SlugAlreadyExistsError());
      }

      const facilityOrError = FacilityMap.dtoToDomain(dto, enterpriseId);

      if (!facilityOrError.isSuccess) {
        return left(Result.fail(facilityOrError.error));
      }

      let facility = facilityOrError.getValue();
      const facilityEntity = await this.repository.persist(facility);
      const savedFacility = await facilityEntity.save();

      facility = this.publisher.mergeObjectContext(facility);
      facility.apply(
        new FacilityAddedEvent(enterpriseId, savedFacility.facility_id),
      );
      facility.commit();

      return right(Result.ok());
    } catch (err) {
      return left(new AppError.UnexpectedError(err));
    }
  }
}
