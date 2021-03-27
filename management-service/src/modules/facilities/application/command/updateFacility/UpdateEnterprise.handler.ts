import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { AppError, Either, left, Result, right } from 'shared/core';

import { UpdateFacilityErrors } from './UpdateFacility.errors';
import { UpdateFacilityCommand } from './UpdateFacility.command';
import { FacilityMap } from '../../../adapter';
import { FacilityKeys } from '../../../FacilityKeys';
import { FacilityRepository } from '../../../domain';

export type UpdateFacilityResponse = Either<
  | AppError.UnexpectedError
  | AppError.ValidationError
  | UpdateFacilityErrors.FacilityNotFoundError,
  Result<void>
>;

@CommandHandler(UpdateFacilityCommand)
export class UpdateFacilityHandler
  implements ICommandHandler<UpdateFacilityCommand, UpdateFacilityResponse> {
  constructor(
    @Inject(FacilityKeys.FacilityRepository)
    private repository: FacilityRepository,
  ) {}

  async execute({
    facilityId,
    enterpriseId,
    dto,
  }: UpdateFacilityCommand): Promise<UpdateFacilityResponse> {
    try {
      const facilityExists = await this.repository.exists(facilityId);
      if (!facilityExists) {
        return left(new UpdateFacilityErrors.FacilityNotFoundError(facilityId));
      }

      const facilityOrError = FacilityMap.dtoToDomain(
        dto,
        enterpriseId,
        facilityId,
      );
      if (!facilityOrError.isSuccess) {
        return left(Result.fail(facilityOrError.error));
      }

      const entity = await this.repository.persist(facilityOrError.getValue());
      entity.save();

      return right(Result.ok());
    } catch (err) {
      return left(new AppError.UnexpectedError(err));
    }
  }
}
